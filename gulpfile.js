var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var htmlify = require('gulp-angular-htmlify');
/*var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');*/
var autoprefixer = require('gulp-autoprefixer');
var ngmin = require('gulp-ngmin');
/*

gulp.task('compress', function() {

  return gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});*/


gulp.task('htmlify', function() {
    gulp.src('templates/*.html')
        .pipe(htmlify())
        .pipe(gulp.dest('dist/template/'));
});

gulp.task('scripts', function() {
  return gulp.src(['js/app.js', 'js/controllers.js', 'js/services.js'])
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


gulp.task('imglify', function () {
    return gulp.src('imagenes/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/imagenes'));
});

gulp.task('default', ['scripts', 'cssprefix', 'minify-css', 'concatcss', 'imglify']);