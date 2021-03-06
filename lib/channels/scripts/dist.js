'use strict';

//
// Required modules

var path = require('path');
var combine = require('stream-combiner');

//
// Gulp modules

var concat = require('gulp-concat-util');
var ngAnnotate = require('gulp-ng-annotate');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

module.exports = function(gulp, config) {

  var src = config.src;

  return function ChannelFactory() {
    // if using applicaiton mode, output script in a scripts subfolder
    return combine(
        // .pipe(sourcemaps.init)
        debug(),
        concat.scripts(src.cwd + '.js', {cwd: src.cwd}),
        ngAnnotate(),
        uglify({output: {beautify: true, indent_level: 2}, mangle: false, compress: false}),
        concat.header(config.banner),
        // .pipe(sourcemaps.write, '.')
        gulp.dest(src.dest),
        uglify(),
        concat.header(config.banner),
        rename(function(path) { path.extname = '.min.js'; }),
        // .pipe(sourcemaps.write, '.')
        gulp.dest(src.dest)
    );
  }
};
