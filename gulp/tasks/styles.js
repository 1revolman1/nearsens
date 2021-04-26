const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const shorthand = require('gulp-shorthand');
const autoprefixer = require('gulp-autoprefixer');
const gulpStylelint = require('gulp-stylelint');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const flexGapPolyfill = require('flex-gap-polyfill');
module.exports = function styles() {
  var plugins = [flexGapPolyfill()];
  if (process.env.NODE_ENV === 'production')
    return gulp
      .src('src/styles/*.scss')
      .pipe(plumber())
      .pipe(
        gulpStylelint({
          failAfterError: false,
          reporters: [
            {
              formatter: 'string',
              console: true,
            },
          ],
        })
      )
      .pipe(sass())
      .pipe(postcss(plugins))
      .pipe(autoprefixer({ grid: 'autoplace' }))
      .pipe(shorthand())
      .pipe(
        cleanCSS(
          {
            debug: true,
            compatibility: '*',
          },
          (details) => {
            console.log(
              `${details.name}: Original size:${details.stats.originalSize} - Minified size: ${details.stats.minifiedSize}`
            );
          }
        )
      )
      .pipe(
        rename({
          suffix: '.min',
        })
      )
      .pipe(gulp.dest('build/css'));
  else
    return gulp
      .src('src/styles/*.scss')
      .pipe(plumber())
      .pipe(
        gulpStylelint({
          failAfterError: false,
          reporters: [
            {
              formatter: 'string',
              console: true,
            },
          ],
        })
      )
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(postcss(plugins))
      .pipe(autoprefixer({ grid: 'autoplace' }))
      .pipe(shorthand())
      .pipe(
        cleanCSS(
          {
            debug: true,
            compatibility: '*',
          },
          (details) => {
            console.log(
              `${details.name}: Original size:${details.stats.originalSize} - Minified size: ${details.stats.minifiedSize}`
            );
          }
        )
      )
      .pipe(sourcemaps.write())
      .pipe(
        rename({
          suffix: '.min',
        })
      )
      .pipe(gulp.dest('build/css'));
};
