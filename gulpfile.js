var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    compass = require('gulp-compass'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    fileinclude = require('gulp-file-include'),
    ejs = require('gulp-ejs');

// 检查脚本
gulp.task('lint', function() {
    gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Sass
gulp.task('sass', function () {
    return gulp.src('./sass/*.scss')
        .pipe(compass({
            config_file: "./config.rb",
            css: "./build/css",
            sass: "./sass"
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('sass:watch', function(){
    gulp.watch('./sass/*.scss', ['sass']);
});

// 压缩、合并脚本
gulp.task('scripts', function() {
    gulp.src('./js/*.js')
        // .pipe(uglify()) //取消压缩
        .pipe(gulp.dest('./build/js'))

});

gulp.task('scripts:lib', function(){
    gulp.run('scripts:common', 'scripts:jquery', 'scripts:template');
})

gulp.task('scripts:common', function() {
    return gulp.src('./js/common/*.js')
        .pipe(gulp.dest('./build/js/common'))
})


gulp.task('scripts:jquery', function() {
    gulp.src('./js/jquery/*.js')
        .pipe(gulp.dest('./build/js/jquery'))
})

gulp.task('scripts:template', function() {
    gulp.src('./js/template/*.js')
        .pipe(gulp.dest('./build/js/template'))
})

gulp.task('scripts:watch', function() {
    gulp.watch('./js/common/*.js', ['scripts:common']);
})

gulp.task('fileinclude', function (){
    return gulp.src('./views/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./build/views'));
});

gulp.task('fileinclude:watch', function (){
    gulp.watch('./views/*.html', ['fileinclude']);
})

gulp.task('ejs', function(){
    return gulp.src('./views/template/*.ejs')
        .pipe(gulp.dest('./build/views/template'));
});

gulp.task('ejs:watch', function(){
    gulp.watch('./views/template/*.ejs', ['ejs']);
})





// 默认任务
gulp.task('default', function(){
    gulp.run('lint', 'sass', 'sass:watch', 'scripts', 'scripts:lib', 'scripts:watch','fileinclude', 'ejs', 'ejs:watch', 'fileinclude:watch');
});
