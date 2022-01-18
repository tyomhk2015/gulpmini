import gulp from 'gulp';
import gpug from 'gulp-pug';
import del from 'del';
import webServer from 'gulp-webserver';
import livereload from 'connect-livereload';
import gimg from 'gulp-image';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoPrefixer from 'gulp-autoprefixer';
import csso from 'gulp-csso';
import bro from 'gulp-bro';
import babelify from 'babelify';
import ghPages from 'gulp-gh-pages';

const sass = gulpSass(dartSass);

const routes = {
  pug: {
    watch: 'src/**/*.pug',
    src: 'src/*.pug',
    dest: 'build',
  },
  img: {
    src: 'src/img/*',
    dest: 'build/img'
  },
  scss: {
    watch: 'src/scss/*.scss',
    src: 'src/scss/style.scss',
    dest: 'build/css'
  },
  js : {
    watch: 'src/js/*.js',
    src: 'src/js/main.js',
    dest: 'build/js'
  },
  build : {
    src: 'build/**/*',
  }
};

// 1 Task = 1 Function
const pug = () => gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest));

const imgOptimize = () => gulp.src(routes.img.src).pipe(gimg()).pipe(gulp.dest(routes.img.dest));

const scss = () => gulp.src(routes.scss.src)
  .pipe(sass().on('error', sass.logError))
  .pipe(autoPrefixer())
  .pipe(csso())
  .pipe(gulp.dest(routes.scss.dest));

const clean = () => del(['build', '.publish']);

const initServer = () => gulp.src('build').pipe(webServer({ livereload: true, open: true }));

const js = () => gulp.src(routes.js.src).pipe(bro({
  transform: [
    babelify.configure({ presets: ["@babel/preset-env"] }),
    ["uglifyify", { global: true }]
  ]
})).pipe(gulp.dest(routes.js.dest));

const ghDeploy = () => gulp.src(routes.build.src).pipe(ghPages());

const watch = () => {
  gulp.watch(routes.pug.watch, pug);
  gulp.watch(routes.scss.watch, scss);
  gulp.watch(routes.js.watch, js);
};


const prepare = gulp.series([clean, imgOptimize]);
const transcode = gulp.series([pug, scss, js]);
const postAction = gulp.parallel([initServer, watch]);

// The name of command has to match with the exporting variable.
// Otherwise this will not work.
export const dev = gulp.series([prepare, transcode, postAction]);
export const deploy = gulp.series([prepare, transcode, ghDeploy, clean])
export const imgOpt = gulp.series([imgOptimize]);
