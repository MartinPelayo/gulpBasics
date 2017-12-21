const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const del = require('del');
const connect = require('gulp-connect');

gulp.task('clean', function() { //Delete everthing in dist folder
  return del('dist');
});

gulp.task('concatScripts', ['clean'], function() { //Concat and return scripts
  return gulp.src([
    'gulp-build-v1/js/circle/circle.js',
    'gulp-build-v1/js/circle/autogrow.js',
    'gulp-build-v1/js/global.js'
  ])
  .pipe(maps.init())
  .pipe(concat('all.min.js'))
  .pipe(maps.write('./'))
  .pipe(gulp.dest('dist/scripts'));
});

gulp.task('minifyScripts', ['concatScripts'], function(){ //Uglify the scritps
  gulp.src('dist/scripts/all.min.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('compileSass', ['clean'], function() { //compile and concat sass
  gulp.src('gulp-build-v1/sass/global.scss')
    .pipe(maps.init())
    .pipe(sass())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('image', ['clean'], function() {
  gulp.src([
    'gulp-build-v1/images/1.jpg',
    'gulp-build-v1/images/2.jpg',
    'gulp-build-v1/images/3.jpg',
    'gulp-build-v1/images/f-spore.png',
    'gulp-build-v1/images/m-spore.png'
  ])
  .pipe(imagemin())
  .pipe(gulp.dest('dist/content'));
});

gulp.task('test', function() {
  connect.server({
    root: './',
    port: 3000,
  });
});

gulp.task('scripts', ['concatScripts', 'minifyScripts']); 
gulp.task('styles', ['compileSass']);
gulp.task('build', ['clean', 'scripts', 'minifyScripts', 'compileSass', 'image']);
gulp.task('server', ['test']);
gulp.task('default',['clean', 'concatScripts', 'minifyScripts', 'compileSass', 'image', 'test']);