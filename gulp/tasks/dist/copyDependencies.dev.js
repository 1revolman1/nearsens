"use strict";

var path = require('path');

var gulp = require('gulp');

var npmDist = require('gulp-npm-dist');

var del = require('del');

var config = require('../config');

module.exports = function copyModules(cb) {
  gulp.src(npmDist(), {
    base: path.join(config.root, 'node_modules')
  }).pipe(gulp.dest(config.copyDependencies.dist)).on('end', cb); // del(config.copyDependencies.dist).then(() => {
  //   gulp.src(npmDist(), { base: path.join(config.root, 'node_modules') })
  //     .pipe(gulp.dest(config.copyDependencies.dist)).on('end', cb)
  // }).catch(cb)
};