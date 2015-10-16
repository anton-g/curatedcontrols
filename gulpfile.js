var gulp = require('gulp'),
    del = require('del'),
    glob = require('glob'),
    plato = require('plato');
var plug = require('gulp-load-plugins')();


var paths = {
    build: './build/',
    js: [
    "./app/**/*module*.js",
    "./app/**/*.js",
    ],
    scripts: [
    'scripts/jquery.min.js',
    'scripts/jquery.flexslider-min.js',
    'scripts/angular.min.js',
    'scripts/parse-1.6.2.min.js',
    'scripts/**/*.js'
    ],
    index: './index.html',
    css: './content/css/**/*.css',
    images: './content/img/**/*',
    fonts: './content/fonts/**/*',
    htmltemplates: './app/**/*.html'
};

gulp.task('default', ['help'], function() {});
gulp.task('help', plug.taskListing);

gulp.task('js', ['analyze', 'templatecache'], function(){
    var source = [].concat(paths.js, paths.build + 'templates.js');

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

gulp.task('analyze', function(){
    generatePlatoReport();

    return gulp
        .src(paths.js)
        .pipe(plug.jshint('./.jshintrc'))
        .pipe(plug.jshint.reporter('jshint-stylish'))
        .pipe(plug.jshint.reporter("fail"));
});

gulp.task('scripts', function() {
    return gulp
      .src(paths.scripts)
      .pipe(plug.concat('vendor.min.js'))
      .pipe(plug.bytediff.start())
      .pipe(plug.uglify())
      .pipe(plug.bytediff.stop(bytediffFormatter))
      .pipe(gulp.dest(paths.build + 'scripts'));
});

gulp.task('css', function(){
  return gulp
    .src(paths.css)
    .pipe(plug.concat('all.min.css'))
    .pipe(plug.autoprefixer('last 2 version', '> 5%'))
    .pipe(plug.bytediff.start())
    .pipe(plug.minifyCss({}))
    .pipe(plug.bytediff.stop(bytediffFormatter))
    .pipe(gulp.dest(paths.build + 'content/css/'));
});

gulp.task('images', function(){
  var dest = paths.build + 'content/img';

  return gulp
    .src(paths.images)
    .pipe(plug.cache(plug.imagemin({
      optimizationLevel: 3
    })))
    .pipe(gulp.dest(dest));
});

gulp.task('fonts', function() {
    var dest = paths.build + 'content/fonts';

    return gulp
        .src(paths.fonts)
        .pipe(gulp.dest(dest));
});

gulp.task('build', ['js', 'scripts', 'css', 'images', 'fonts'], function(){
  var sources = gulp.src(['./build/scripts/*.js', './build/all.min.js', './build/**/*.css'], {read: false});

  return gulp
    .src(paths.index)
    .pipe(plug.inject(sources, { ignorePath: 'build', addRootSlash: false }))
    .pipe(gulp.dest(paths.build));
});

gulp.task('templatecache', function() {
    return gulp
        .src(paths.htmltemplates)
        .pipe(plug.minifyHtml({
            empty: true
        }))
        .pipe(plug.angularTemplatecache('templates.js', {
            module: 'curatedcontrols.core',
            standalone: false,
            root: 'app/'
        }))
        .pipe(gulp.dest(paths.build));
});

gulp.task('clean', function(cb) {
    del(paths.build, cb);
});

/**
 * Start Plato inspector and visualizer
 */
function generatePlatoReport() {
    var files = glob.sync('./app/**/*.js');

    var options = {
        title: 'Plato Inspections Report',
    };
    var outputDir = './report/plato';

    plato.inspect(files, outputDir, options, function(report) {});
}

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
