var gulp = require('gulp'),
    del = require('del');
var plug = require('gulp-load-plugins')();

var source = [
  './app/**/*.js'
];

var paths = {
  build: './build/',
  scripts: './scripts/**/*.js'
};

gulp.task('js', ['analyze'], function(){
  return gulp
    .src(source)
    .pipe(plug.concat('all.min.js'))
    .pipe(plug.ngAnnotate({
      add: true,
      single_quotes: true
    }))
    .pipe(plug.bytediff.start())
    .pipe(plug.uglify({mangle:true}))
    .pipe(plug.bytediff.stop(bytediffFormatter))
    .pipe(gulp.dest(paths.build));
});

gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(plug.concat('vendor.min.js'))
        .pipe(plug.bytediff.start())
        .pipe(plug.uglify())
        .pipe(plug.bytediff.stop(bytediffFormatter))
        .pipe(gulp.dest(paths.build));
});

gulp.task('analyze', function(){
  return gulp
    .src(source)
    .pipe(plug.jshint('./.jshintrc'))
    .pipe(plug.jshint.reporter('jshint-stylish'))
    .pipe(plug.jshint.reporter("fail"));
});

gulp.task('build', ['js'], function(){

});

gulp.task('clean', function(cb) {
    del(paths.build, cb);
});

/**
 * Formatter for bytediff to display the size changes after processing
 * @param  {Object} data - byte data
 * @return {String}      Difference in bytes, formatted
 */
function bytediffFormatter(data) {
    var difference = (data.savings > 0) ? ' smaller.' : ' larger.';
    return data.fileName + ' went from ' +
        (data.startSize / 1000).toFixed(2) + ' kB to ' + (data.endSize / 1000).toFixed(2) + ' kB' +
        ' and is ' + formatPercent(1 - data.percent, 2) + '%' + difference;
}

/**
 * Format a number as a percentage
 * @param  {Number} num       Number to format as a percent
 * @param  {Number} precision Precision of the decimal
 * @return {String}           Formatted percentage
 */
function formatPercent(num, precision) {
    return (num * 100).toFixed(precision);
}
