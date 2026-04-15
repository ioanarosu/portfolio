var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var htmlPartials = require('gulp-html-partial');
var autoprefixer = require('gulp-autoprefixer').default;
var clean = require('gulp-clean');
var image = require('gulp-image');
var browserSync = require('browser-sync');


gulp.task('sass', function () {
  return gulp.src('src/scss/**/*.scss')
             .pipe(sass().on('error', sass.logError))
             .pipe(autoprefixer({
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
  browserSync.init({
    server: {
      baseDir: 'build'
    },
    port: 1337,
    open: true
  });
});

gulp.task('watch', gulp.series(function () {
  gulp.watch('./src/scss/**/*.scss', { events: 'all' }, gulp.series('sass', function(done) {
    browserSync.reload();
    done();
  }));
  gulp.watch('./src/**/*.html', { events: 'all' }, gulp.series('html', function(done) {
    browserSync.reload();
    done();
  }));
  gulp.watch('./src/js/**/*.js', { events: 'all' }, gulp.series('js', function(done) {
    browserSync.reload();
    done();
  }));
}));

gulp.task('images', function () {
  return gulp.src(['src/images/**/*.*'])
  //.pipe(image())
  .pipe(gulp.dest('build/images'))
});

gulp.task('js', function () {
  return gulp.src(['src/js/**/*.js'])
  .pipe(gulp.dest('build/js'))
});

gulp.task('default', gulp.parallel('sass', 'html', 'js', 'webserver', 'images', 'watch'));
gulp.task('generate', gulp.parallel('sass', 'html', 'js', 'images'));
