var gulp = require('gulp');
var del = require('del');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');

gulp.task('clean', function() {
    return del('dist/**/*');
});

gulp.task('lint', function() {
    return gulp.src('src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('vendor-js', ['clean'], function() {
    return gulp.src([
        'bower_components/jquery/dist/jquery.js',
        'bower_components/tooltipster/js/jquery.tooltipster.js'
    ])
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('vendor-css', ['clean'], function() {
    return gulp.src('bower_components/tooltipster/css/tooltipster.css')
        .pipe(minifyCss())
        .pipe(rename('vendor.min.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('copy-src', ['clean'], function() {
    return gulp.src('src/**/*.{js,html,css,json,png}')
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-js', function() {
    return gulp.src('src/**/*.js')
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-html', function() {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-css', function() {
    return gulp.src('src/**/*.css')
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-json', function() {
    return gulp.src('src/**/*.json')
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['lint', 'copy-js']);
    gulp.watch('src/**/*.html', ['copy-html']);
    gulp.watch('src/**/*.css', ['copy-css']);
    gulp.watch('src/**/*.json', ['copy-json']);
});

gulp.task('default', ['clean', 'lint', 'vendor-js', 'vendor-css', 'copy-src']);
