const gulp = require('gulp')

module.exports = function fonts() {
  return gulp.src('src/webfonts/*')
    .pipe(gulp.dest('build/webfonts'))
}
