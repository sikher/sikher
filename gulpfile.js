var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var jsonminify = require('gulp-jsonminify');
var uglify = require('gulp-uglify');
var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var useref = require('gulp-useref');
var clean = require('gulp-clean');

var paths = {
  copyfonts: ['./www/fonts/**/*.{ttf,woff,eof,svg}'],
  sass: ['./scss/**/*.scss'],
  jsonminify: ['./www/db/*.json'],
  templatecache: ['./www/templates/**/*.html'],
  ng_annotate: ['./www/js/*.js'],
  useref: ['./www/*.html'],
  dist: './www/dist'
};

// TODO: Implement a working clean system (partially implemented, still getting ENOTEMPTY: directory not empty)
gulp.task('clean', function() {
  return gulp.src('./www/dist/**/*.*', {read: false})
    .pipe(clean());
});

gulp.task('copyfonts', ['clean'], function() {
  gulp.src(paths.copyfonts)
    .pipe(gulp.dest('./www/dist/fonts'));
});

gulp.task('sass', ['clean'], function(done) {
  gulp.src(paths.sass)
    .pipe(sass())
    .pipe(gulp.dest('./www/dist/css'))
    .pipe(cleanCSS({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/dist/css'))
    .on('end', done);
});

gulp.task('jsonminify', ['clean'], function (done) {
  gulp.src(paths.jsonminify)
    .pipe(jsonminify())
    .pipe(gulp.dest('./www/dist/db'))
    .on('end', done);
});

gulp.task('templatecache', ['clean'], function (done) {
  gulp.src(paths.templatecache)
    .pipe(templateCache({standalone:true}))
    .pipe(gulp.dest('./www/dist/js'))
    .on('end', done);
});

gulp.task('ng_annotate', ['clean'], function (done) {
  gulp.src(paths.ng_annotate)
    .pipe(ngAnnotate({single_quotes: true}))
    .pipe(gulp.dest('./www/dist/js'))
    .on('end', done);
});

gulp.task('useref', ['clean', 'sass', 'jsonminify', 'templatecache', 'ng_annotate'], function (done) {
  gulp.src(paths.useref)
    .pipe(useref())
    .pipe(gulp.dest(paths.dist))
    .on('end', done);
});

gulp.task('default', ['sass', 'jsonminify', 'templatecache', 'ng_annotate', 'useref']);

gulp.task('watch', ['clean'], function() {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.jsonminify, ['jsonminify']);
    gulp.watch(paths.templatecache, ['templatecache']);
    gulp.watch(paths.ng_annotate, ['ng_annotate']);
    gulp.watch(paths.useref, ['useref']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
