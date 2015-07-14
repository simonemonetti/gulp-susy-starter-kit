var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    compass = require('gulp-compass'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    minifyCSS = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');
    // iconfont = require('gulp-iconfont'),
    // iconfontCss = require('gulp-iconfont-css'),
    // consolidate = require('gulp-consolidate');

// Compass (with Sourcemaps and CSS Minifier)
gulp.task('compass', function() {
  gulp.src('./app/assets/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(compass({
      config_file: './config.rb',
      css: './app/assets/css',
      sass: './app/assets/scss'
    }))
    .on('error', function(error) {
      // Would like to catch the error here
      browserSync.notify
    })
    .pipe(sourcemaps.write())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./site/css'));
});

gulp.task('usemin', function () {
  return gulp.src('app/*.html')
      .pipe(usemin({
        css: [minifyCSS(), 'concat'],
        //html: [minifyHtml({empty: true})],
        js: [uglify(), rev()]
      }))
      .pipe(gulp.dest('site'));
});

/**
* Compile files from assets/js into site/js (for live injecting)
 */
gulp.task('js', function(){
    return gulp.src('app/assets/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('site/js'))
        .pipe(browserSync.reload({stream:true}));
});

/**
* Compile files from assets/vendor into site/js, site/css ecc (for live injecting)
 */
gulp.task('js:vendor', function(){
    return gulp.src([
            //'app/assets/vendor/cookies-enabler/cookies-enabler.min.js'
        ])
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('site/js'))
        .pipe(browserSync.reload({stream:true}));
});

/**
 * Copy files from assets/img into site/img (for live injecting)
 */
gulp.task('img', function() {
    return gulp.src(['app/assets/img/*'])
        .pipe(gulp.dest('site/img'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('html', function() {
    return gulp.src('app/*.html')
      .pipe(gulp.dest('site'))
      .pipe(browserSync.reload({stream:true}));
});

/**
 * Copy files from assets/img into site/img (for live injecting)
 */
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
    .pipe(gulp.dest('site/fonts/'));
});

/**
 * Launch the Server
 */
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'site'
        }
    });
});

gulp.task('watchAssets', function() {
  gulp.watch(['app/assets/icons/*.svg'], ['Iconfont']);
  gulp.watch(['app/assets/scss/*.scss', 'app/assets/scss/**/*.scss'], ['compass']);
  gulp.watch(['app/assets/js/*.js', 'app/assets/js/**/*.js'], ['js']);
  gulp.watch(['app/assets/img/*'], ['img']);
  gulp.watch(['app/*.html'], ['html']);
});

/**
 * COMMAND-LINE TASKS
 */

gulp.task('default', ['html', 'js', 'js:vendor', 'compass', 'img', 'usemin', 'browser-sync']); //Default task, running just `gulp` will compile the assets and compile the site
gulp.task('watch', ['html', 'js', 'js:vendor', 'compass', 'img', 'usemin', 'browser-sync', 'watchAssets']);
// gulp.task('fonts', ['Iconfont']);