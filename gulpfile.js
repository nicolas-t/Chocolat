const gulp = require('gulp');
const gutil = require('gulp-util');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const bump = require('gulp-bump');
const mochaPhantomJS = require('gulp-mocha-phantomjs');

gulp.task('testing', () =>
    gulp.src('./test/index.html')
    .pipe(mochaPhantomJS())
);

gulp.task('build-js', () =>
    gulp.src('./src/js/jquery.chocolat.js')
    .pipe(gulp.dest('./dist/js/'))
    .pipe(rename('jquery.chocolat.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'))
);

gulp.task('build-css', () =>
    gulp.src('./src/css/chocolat.css')
    .pipe(gulp.dest('./dist/css/'))
);

gulp.task('build-images', () =>
    gulp.src('./src/images/*')
    .pipe(gulp.dest('./dist/images/'))
);

gulp.task('lint', () =>
    gulp.src('./src/js/jquery.chocolat.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
);

gulp.task('bump', () =>
    gulp.src(['./package.json', './bower.json'])
    .pipe(bump())
    .pipe(gulp.dest('./'))
);

gulp.task('watch-test',() => gulp.watch(['./test/*.js', './src/js/*.js', './src/css/*.css'], ['test']));

gulp.task('watch-src',() => gulp.watch(['./src/js/*.js', './src/css/*.css'], ['build-js', 'build-css']));

gulp.task('test', [
    'build',
    'testing',
    'watch-test'
]);
gulp.task('build', [
    'build-js',
    'build-css',
    'build-images'
]);
gulp.task('default', [
    'build',
    'watch-src'
]);