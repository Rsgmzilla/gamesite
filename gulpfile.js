const gulp = require("gulp"),
      debug = require('gulp-debug'),
      babel = require('gulp-babel'),
      gutil = require('gulp-util'),
      uglify = require('gulp-uglify'),
      sourceMaps = require('gulp-sourcemaps'),
      minifyCSS = require('gulp-cssnano'),
      jsHint = require('gulp-jshint');

gulp.task('styles', () => {
    gulp.src('assets/styles/*.css')
        .pipe(debug({title: "src"}))
        .pipe(sourceMaps.init())
        .pipe(minifyCSS())
        .pipe(debug({title: "minifyCSS"}))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('public/css'))
        .pipe(debug({title: "dest"}));
});

gulp.task('scripts', () => {
    gulp.src('assets/scripts/*.js')
        .pipe(debug({title: "src"}))
        .pipe(babel({presets: ['es2015']}))
        .pipe(sourceMaps.init())
        .pipe(uglify())
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(debug({title: "uglify"}))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('public/js'))
        .pipe(debug({title: "dest"}));
});

gulp.task('lint', function(){
    return gulp.src('assets/scripts/*.js')
        .pipe(debug({title: "src"}))
        .pipe(jsHint())
        .pipe(jsHint.reporter('default'));
});

gulp.task('default', ['styles', 'scripts', 'lint']);