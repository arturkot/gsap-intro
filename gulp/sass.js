var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

var CSS_SRC = './src/scss/**/*.scss';
var CSS_OUT = './dist/css';

var sassOptions = {
  includePaths: ['./node_modules'],
};

var autoprefixerOptions = {
  browsers: ['last 2 versions'],
};

gulp.task('sass', function () {
  return gulp.src(CSS_SRC)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(CSS_OUT));
});

gulp.task('sass:watch', function () {
  return gulp
    .watch(CSS_SRC, ['sass'])
    .on('change', function (event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});
