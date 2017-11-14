var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var ngmin = require('gulp-ngmin');
var htmlmin = require('gulp-htmlmin');
/*

gulp.task('compress', function() {

  return gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});*/

gulp.task('minify-html', function() {
  return gulp.src('templates/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/templates/'));
});

gulp.task('scripts', function() {
  return gulp.src('js/*.js')
  
    .pipe(concat('all.js', {newLine: ';'}))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('cssprefix', function () {
    return gulp.src('css/*.css')
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
            cascade: true
        }))
        .pipe(gulp.dest('dist/css_beta'));
});

gulp.task('minify-css', function() {
  return gulp.src('css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('concatcss', function() {
  return gulp.src('dist/css/*.css')
    .pipe(concat('all.css'))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('concatjs', function() {
  return gulp.src('plugins/*.js')
    .pipe(concat('all_plugin.js'))
    .pipe(gulp.dest('dist/plugins'));
});

gulp.task('default', ['minify-html','scripts', 'cssprefix', 'minify-css', 'concatcss', 'concatjs']);
gulp.task('dev', ()=>{
  gulp.watch('templates/*.html', ['minify-html']),
  gulp.watch('js/*.js', ['scripts']),
  gulp.watch('css/*.css', ['cssprefix']),
  gulp.watch('css/*.css', ['minify-css']),
  gulp.watch('dist/css/*.css', ['concatcss']),
  gulp.watch('plugins/*.js', ['concatjs'])
});