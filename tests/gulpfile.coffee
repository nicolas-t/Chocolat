gulp = require 'gulp'
gutil = require 'gulp-util'
coffee = require 'gulp-coffee'

gulp.task 'compile-coffee', ->
    gulp.src './src/*.coffee'
        .pipe coffee({bare: true}).on('error', gutil.log)
        .pipe gulp.dest './'

gulp.task 'watch',->
    gulp.watch(['./src/*.coffee'], ['compile-coffee'])

gulp.task 'default', [
    'compile-coffee'
    'watch'
]