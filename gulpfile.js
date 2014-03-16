// Load plugins
var gulp = require('gulp'),
	gutil = require('gulp-util'),
    less = require('gulp-less'),
     zip = require('gulp-zip'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    cache  = require('gulp-cache'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr();
   
 

var target_dir = 'assets';
var source_dir = 'src/assets';
var vendor_dir = 'src/assets/vendor';


var js_files = [
    
    source_dir+ '/js/*.js',
    vendor_dir+ '/fitvids/*.js',
    //vendor_dir+ '/bootstrap/js/*.js',
    //vendor_dir+ '/bootstrap/js/affix.js',
    //vendor_dir+ '/bootstrap/js/alert.js',
    vendor_dir+ '/bootstrap/js/button.js',
    //vendor_dir+ '/bootstrap/js/carousel.js',
    vendor_dir+ '/bootstrap/js/collapse.js',
    vendor_dir+ '/bootstrap/js/dropdown.js',
    //vendor_dir+ '/bootstrap/js/modal.js',
    //vendor_dir+ '/bootstrap/js/popover.js',
    //vendor_dir+ '/bootstrap/js/scrollspy.js',
    //vendor_dir+ '/bootstrap/js/tab.js',
    //vendor_dir+ '/bootstrap/js/tooltip.js',
    vendor_dir+ '/bootstrap/js/transition.js'
 
];


//source_dir+ '/less/styles.less'


gulp.task('styles', function () {
	gulp.src(source_dir+ '/less/styles.less')
	.pipe(less())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(target_dir +'/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest(target_dir +'/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});
 
// Scripts
gulp.task('scripts', function() {
  return gulp.src(js_files)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(target_dir+ '/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(livereload(server))
    .pipe(gulp.dest(target_dir + '/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});
 
// Images
gulp.task('images', function() {
  return gulp.src(source_dir +'/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(livereload(server))
    .pipe(gulp.dest(target_dir +'/images'))
    .pipe(notify({ message: 'Images task complete' }));
});
 
// Clean
gulp.task('clean', function() {
  return;
  return gulp.src([target_dir +'/css', target_dir +'/js', target_dir +'/images'], {read: false})
    .pipe(clean());
});
 
// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});
 
// Watch
gulp.task('watch', function() {
 
  // Listen on port 35729
  server.listen(35729, function (err) {
    if (err) {
      return console.log(err)
    };
 
    // Watch .scss files
    gulp.watch(source_dir +'/less/**/*.less', ['styles']);
 
    // Watch .js files
    gulp.watch(source_dir +'/js/**/*.js', ['scripts']);
 
    // Watch image files
    gulp.watch(source_dir +'/images/**/*', ['images']);
 
  });
 
});