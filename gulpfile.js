var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('script', function() {
  return (
    gulp
      .src(['./src/timemark.js']) // 指明源文件路径、并进行文件匹配
      // .pipe(concat("./dist/timemark.js"))
      // .pipe(ts()) // ts
      .pipe(babel()) // babel
      .pipe(rename('./dist/timemark.js'))
      .pipe(gulp.dest('./'))
      .pipe(uglify({})) // 使用uglify进行压缩
      .pipe(rename('./dist/timemark.min.js'))
      // .pipe(sourcemaps.write()) // 输出 .map 文件
      .pipe(gulp.dest('./'))
  ); // 输出路径
});

// 监听任务
gulp.task('watch', function() {
  gulp.watch(['./timemark.js', '!node_modules/**'], ['script']);
});

gulp.task('default', ['script'], function() {
  console.log('uglify successful');
});
