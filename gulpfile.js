var gulp = require('gulp');
var del = require('del');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var Server = require('karma').Server;

gulp.task('clean', function() {
    return del('dist/**/*');
});

gulp.task('lint', function() {
    return gulp.src('src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('karma', function(done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('vendor-js', function() {
    return gulp.src([
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/tooltipster/js/jquery.tooltipster.min.js'
    ])
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('vendor-css', function() {
    return gulp.src('bower_components/tooltipster/css/tooltipster.css')
        .pipe(minifyCss())
        .pipe(rename('vendor.min.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('copy-src', function() {
    return gulp.src([
        'src/css/*.css',
        'src/icons/*.png',
        'src/js/inject/*.js',
        'src/js/*.js',
        'src/*.json',
        'src/*.html'
    ], {base: 'src'})
        .pipe(gulp.dest('dist'));
});

gulp.task('concat-src', function() {
    return gulp.src('src/js/bg/*.js')
        .pipe(concat('ownedonsteam.js'))
        .pipe(gulp.dest('dist/js/bg'));
});

gulp.task('watch', function() {
    gulp.watch('src/js/bg/*.js', ['lint', 'concat-src']);
    gulp.watch([
        'src/js/*.js',
        'src/js/inject/*.js'
    ], ['lint', 'copy-src']);
    gulp.watch([
        'src/css/*.css',
        'src/icons/*.png',
        'src/*.json',
        'src/*.html'
    ], ['copy-src']);
});

gulp.task('default', ['lint', 'karma', 'vendor-js', 'vendor-css', 'concat-src', 'copy-src']);
