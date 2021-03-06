'use strict';

//
// Required modules

var combine = require('stream-combiner');
var Promise = require('bluebird');

//
// Gulp modules

var transformify = require('gulp-transformify');
var gulpif = require('gulp-if');
// var less = transformify(Promise.promisify(require('less').render), {name: 'gulp-less', ext: '.css', config: function(file) { this.filename = file.path; }});
var less = require('gulp-less');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

module.exports = function(gulp, config) {

  var src = config.src;
  return function() {
    return combine(
      gulpif('**/*.less', less()),
      gulpif('**/*.{sass,scss}', sass()),
      autoprefixer('last 1 version')
    );
  };

};
