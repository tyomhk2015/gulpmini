# gulpmini

Learning and adapting to Gulp.

### Learned 📝
Automated ...
1. Compiling templates, pug, to HTML.
2. Watching file changes.
3. Setting a local web server.
4. Image optimization
5. Transcompiling SCSS files to CSS, w/ minification & adding prefixes for cross-browsing.
6. Transcompiling babel JS files to pure JS files.
7. Deploying this project on github pages.

<a href="https://tyomhk2015.github.io/gulpmini/"><img src="https://user-images.githubusercontent.com/35278730/149953796-9e5db5c4-f3ab-484a-a369-657f4296490e.jpg" /></a>

### Troubleshootings 🛠️
1. 'Task not finished' error

The task is wrapped with {}, adding `done()` to the last line of the scope explicitly tells Gulp that the task is finished. 
Writing a task with out {} also percieved as task is done.

<pre>
  // Task finished
  const pug = () => gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest));
  
  const pug = (done) => {
    gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest));
    done();
  }
  
  // Task unfinished
  const pug = () => {
    gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest));
  }
</pre>

If `done()` is not typed in the {} scope, Gulp perceive as task is not finished.

2. Depending on the version of gulp-plugins, some files in the `node_module` had to be modified.
