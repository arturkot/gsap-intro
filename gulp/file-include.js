var gulp = require('gulp');
var fileinclude = require('gulp-file-include');

gulp.task('file-include', function() {
  return gulp.src(['src/*.html'])
    .pipe(fileinclude({
      filters: {
        idsToClasses: idsToClasses
      }
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('file-include:watch', function () {
  return gulp
    .watch('src/*.html', ['file-include'])
    .on('change', function (event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

function idsToClasses (markup) {
  return markup.replace(/(\s)(id)(=)/g, '$1class$3');
}
