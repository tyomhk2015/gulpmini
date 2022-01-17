import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";
import webServer from 'gulp-webserver';
import livereload from "connect-livereload";

const routes = {
  pug: {
    watch: "src/**/*.pug",
    src:"src/*.pug",
    dest: "build"
  }
}

// 1 Task = 1 Function
const pug = () => gulp
  .src(routes.pug.src)
  .pipe(gpug())
  .pipe(gulp.dest(routes.pug.dest));

const clean = () => del(["build"]);
const initServer = () => gulp.src("build").pipe(webServer({livereload: true, open: true}));
const watch = () => {
  gulp.watch(routes.pug.watch, pug);
}

const prepare = gulp.series([clean]);
const transcode = gulp.series([pug]);
const postAction = gulp.parallel([initServer, watch]);

// The name of command has to match with the exporting variable.
// Otherwise this will not work.
export const dev = gulp.series([prepare, transcode, postAction]);