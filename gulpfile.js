var gulp = require('gulp');
var compass = require('gulp-compass'),
    minifyCSS = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps'); 
var connect = require('gulp-connect');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var consolidate = require('gulp-consolidate');
// var reload = require('gulp-server-livereload');

// Compass (with Sourcemaps and CSS Minifier)
gulp.task('compass', function() {
  gulp.src('./app/assets/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(compass({
      config_file: './config.rb',
      css: 'app/assets/stylesheets',
      sass: 'app/assets/scss'
    }))
    .on('error', function(error) {
      // Would like to catch the error here 
      console.log(error);
      this.emit('end');
    })
    .pipe(sourcemaps.write())
    .pipe(minifyCSS())
    .pipe(gulp.dest('app/assets/css'));
});

// Iconfont
gulp.task('Iconfont', function(){
  gulp.src(['./app/assets/icons/*.svg'])
    .pipe(iconfontCss({
      fontName: 'myFont',
      path: 'scss',
      targetPath: '../scss/library/_icons.scss',
      fontPath: '../fonts/'
    }))
    .pipe(iconfont({
      fontName: 'myFont',
      //appendUnicode: true, // recommended option
      normalize: true
     }))
    .pipe(gulp.dest('app/assets/fonts/'));
});

// Connect
gulp.task('connect', function() {
	connect.server({
    root: 'app',
		port: 8080, 
		livereload: true
	});
});

gulp.task('watch', function() {
  gulp.watch('./app/assets/icons/*.svg', ['Iconfont']);
  gulp.watch('./app/assets/scss/**/*.scss', ['compass']);
  gulp.watch('./app/assets/scss/*.scss', ['compass']);
});

gulp.task('fonts', ['Iconfont']);

gulp.task('default', ['compass', 'connect', 'watch']);
