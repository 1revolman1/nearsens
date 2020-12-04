"use strict";

var gulp = require('gulp');

var plumber = require('gulp-plumber');

var pug = require('gulp-pug');

var pugLinter = require('gulp-pug-linter');

var htmlValidator = require('gulp-w3c-html-validator');

var bemValidator = require('gulp-html-bem-validator');

var config = require('../config');

module.exports = function pug2html() {
  return gulp.src('src/pages/*.pug').pipe(plumber()).pipe(pugLinter({
    reporter: 'default'
  })).pipe(pug({
    pretty: config.pug2html.beautifyHtml
  })) // .pipe(htmlValidator())
  // .pipe(bemValidator())
  .pipe(gulp.dest('build'));
};