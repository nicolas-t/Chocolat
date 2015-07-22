gulp = require 'gulp'
gutil = require 'gulp-util'
rename = require 'gulp-rename';
uglify = require 'gulp-uglify'
coffee = require 'gulp-coffee'
bump = require 'gulp-bump'
mochaPhantomJS = require 'gulp-mocha-phantomjs'
jshint = require 'gulp-jshint'

gulp.task 'compile-coffee', ->
    gulp.src './test/*.coffee'
        .pipe coffee({bare: true}).on('error', gutil.log)
        .pipe gulp.dest './test/'

gulp.task 'testing', ->
    gulp.src('./test/index.html')
    .pipe(mochaPhantomJS());

gulp.task 'build-js', ->
    gulp.src('./src/js/jquery.chocolat.js')
    .pipe gulp.dest('./dist/js/')
    .pipe(rename('jquery.chocolat.min.js'))
    .pipe(uglify())
    .pipe gulp.dest('./dist/js/')

gulp.task 'build-css', ->
    gulp.src('./src/css/chocolat.css')
    .pipe gulp.dest('./dist/css/')

gulp.task 'build-images', ->
    gulp.src('./src/images/*')
    .pipe gulp.dest('./dist/images/')

gulp.task 'lint', ->
    gulp.src('./src/js/jquery.chocolat.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))

gulp.task 'bump', ->
    gulp.src(['./package.json', './bower.json'])
    .pipe(bump())
    .pipe gulp.dest('./')

gulp.task 'watch-test',->
    gulp.watch(['./test/*.coffee', './src/js/*.js', './src/css/*.css'], ['test'])

gulp.task 'watch-src',->
    gulp.watch(['./src/js/*.js', './src/css/*.css'], ['build-js', 'build-css'])

gulp.task 'test', [
    'lint'
    'build'
    'compile-coffee'
    'testing'
    'watch-test'
]
gulp.task 'build', [
    'build-js'
    'build-css'
    'build-images'
]
gulp.task 'default', [
    'lint'
    'build'
    'watch-src'
]