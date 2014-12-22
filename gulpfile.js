var gulp = require('gulp')
  , jshint = require('gulp-jshint')
  , to5 = require('gulp-6to5');

gulp.task('to5', function () {
  return gulp.src('./lib/node.js')
    .pipe(to5())
    .pipe(gulp.dest('./build'));
});

gulp.task('jshint', function () {
  return gulp.src('./lib/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('default', ['jshint', 'to5']);
