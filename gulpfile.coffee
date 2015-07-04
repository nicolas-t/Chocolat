gulp = require 'gulp'
gutil = require 'gulp-util'
coffee = require 'gulp-coffee'
mochaPhantomJS = require('gulp-mocha-phantomjs')

gulp.task 'compile-coffee', ->
    gulp.src './test/src/*.coffee'
        .pipe coffee({bare: true}).on('error', gutil.log)
        .pipe gulp.dest './test/'

gulp.task 'watch',->
    gulp.watch(['./test/src/*.coffee'], ['compile-coffee', 'testing'])

gulp.task 'testing', ->
    gulp.src('./test/index.html')
    .pipe(mochaPhantomJS());

gulp.task 'default', [
    'compile-coffee'
    'watch'
]

gulp.task 'test', [
    'compile-coffee'
    'testing'
    'watch'
]