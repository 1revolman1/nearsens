"use strict";

var gulp = require('gulp');

var serve = require('./gulp/tasks/serve');

var pug2html = require('./gulp/tasks/pug2html');

var styles = require('./gulp/tasks/styles');

var script = require('./gulp/tasks/script');

var fonts = require('./gulp/tasks/fonts');

var imageMinify = require('./gulp/tasks/imageMinify');

var clean = require('./gulp/tasks/clean');

var copyDependencies = require('./gulp/tasks/copyDependencies');

var lighthouse = require('./gulp/tasks/lighthouse');

var svgSprite = require('./gulp/tasks/svgSprite');

function setMode() {
  var isProduction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return function (cb) {
    process.env.NODE_ENV = isProduction ? 'production' : 'development';
    cb();
  };
}

var dev = gulp.parallel(pug2html, styles, script, fonts, imageMinify, svgSprite);
var build = gulp.series(clean, copyDependencies, dev);
var stylescript = gulp.parallel(styles, script);
module.exports.start = gulp.series(setMode(), build, serve);
module.exports.build = gulp.series(setMode(true), build);
module.exports.stylescript = gulp.series(setMode(true), stylescript);
module.exports.lighthouse = gulp.series(lighthouse);