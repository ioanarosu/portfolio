var gulp = require('gulp');
var sass = require('gulp-sass');
var htmlPartials = require('gulp-html-partial');
var webserver = require('gulp-webserver');
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var image = require('gulp-image');


gulp.task('sass', function () {
  return gulp.src('src/scss/**/*.scss')
             .pipe(sass().on('error', sass.logError))
             .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
              }))
             .pipe(gulp.dest('build/css'))
});

gulp.task('html', function (){
  return gulp.src(['src/*.html'])
  .pipe(htmlPartials({
    basePath: 'src/partials/'
    }))
  .pipe(gulp.dest('build'))
});

gulp.task('clean', function (){
  return gulp.src('build', {read: false})
  .pipe(clean());
  });

gulp.task('webserver', function () {
  return gulp.src('build')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      port: 1337,
      open: true
    }));
  });

gulp.task('watch', function () {
  gulp.watch(['./src/scss/**/*.scss'], ['sass']);
  gulp.watch(['./src/**/*.html'], ['html']);
});

gulp.task('images', function () {
  return gulp.src(['src/images/**/*.*'])
  //.pipe(image())
  .pipe(gulp.dest('build/images'))
});

gulp.task('js', function () {
  return gulp.src(['src/js/**/*.js'])
  .pipe(gulp.dest('build/js'))
});

gulp.task('default', ['sass', 'html', 'webserver', 'images', 'watch']);
