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
    return gulp.src('src/**/*')
        .pipe(gulp.dest('dist'));
});

gulp.task('update-js', function() {
    return gulp.src('src/**/*.js')
        .pipe(gulp.dest('dist'));
});

gulp.task('update-css', function() {
    return gulp.src('src/**/*.css')
        .pipe(gulp.dest('dist'));
});

gulp.task('update-json', function() {
    return gulp.src('src/**/*.json')
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['lint', 'update-js']);
    gulp.watch('src/**/*.css', ['update-css']);
    gulp.watch('src/**/*.json', ['update-json']);
});

gulp.task('default', ['clean', 'lint', 'vendor-js', 'vendor-css', 'copy-src']);
