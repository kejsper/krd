const gulp = require('gulp');
const sass = require('gulp-ruby-sass');

gulp.task('default', ['sass']);

gulp.task('sass', function() {
  return sass('src/scss/**/*.scss')
         .on('error', sass.logError)
         .pipe(gulp.dest('build/css/'));
});

gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', ['sass']);
});
