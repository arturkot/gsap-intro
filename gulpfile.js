require('./gulp/file-include');
require('./gulp/sass');
var gulp = require('gulp');

gulp.task('default', ['file-include:watch', 'sass:watch']);
