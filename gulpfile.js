var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    babel = require('gulp-babel'),
    config = {
      style: {
        main: './app/sass/app.scss',
        watch: './app/**/*.scss',
        output: './www/css',
        style: './app/sass/*.scss',
        styleOutput: './www/css'
      },
      js: {
        main: './app/js/app.js',
        watch: './app/js/**/*.js',
        output: './www/js',
        controller: './app/controller/*.js',
        controllerOput: './www/controller'
      },
      jade: {
        main: './app/index.jade',
        watch: './app/**/*.jade',
        output: './www',
        views: './app/views/*.jade',
        viewsOutput: './www/views'
      }
    };

gulp.task('server', function() {
  gulp.src('./www')
    .pipe(webserver({
      host: '0.0.0.0',
      port: 8088,
      livereload: true
    }));
});

gulp.task('build:css', function() {
  gulp.src(config.style.main)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest(config.style.output));
});

gulp.task('build:jade', function() {
  return gulp.src(config.jade.main)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(config.jade.output));
});

gulp.task('build:views', function() {
  return gulp.src(config.jade.views)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(config.jade.viewsOutput));
});

gulp.task('build:js', function() {
  return gulp.src(config.js.main)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(config.js.output));
});

gulp.task('build:controller', function() {
  return gulp.src(config.js.controller)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(config.js.controllerOput));
});

gulp.task('watch', function() {
  gulp.watch(config.style.watch, ['build:css']);
  gulp.watch(config.jade.watch, ['build:jade']);
  gulp.watch(config.jade.views, ['build:views']);
  gulp.watch(config.js.watch, ['build:js']);
  gulp.watch(config.js.controller, ['build:controller']);
});

gulp.task('build', [
  'build:css',
  'build:jade',
  'build:views',
  'build:js',
  'build:controller']);

gulp.task('default', [
  'server',
  'watch',
  'build'
]);
