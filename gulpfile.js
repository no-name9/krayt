/* ============================NEW============================ */
'use strict';
const { src, dest } = require('gulp');

const gulp = require('gulp');
const del = require('del');
const plumber = require('gulp-plumber');
const htmlMin = require('gulp-htmlmin');
const sass = require('gulp-sass')(require('sass'));
const purgeCss = require('gulp-purgecss');
const cleanCss = require('gulp-clean-css');
const typescript = require('gulp-typescript');
const autoprefixer = require('gulp-autoprefixer');

function html() {
  return src('src/*.html')
    .pipe(htmlMin({ collapseWhitespace: true }))
    .pipe(dest('dist/'));
}

function css() {
  return src('src/css/*.css')
    .pipe(
      purgeCss({
        content: ['src/*.html'],
        safelist: { greedy: [/:where$/] },
      })
    )
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCss())
    .pipe(dest('dist/css/'));
}

function js() {
  return src('src/js/*.js').pipe(dest('dist/js/'));
}

function images() {
  return src('src/images/*.{jpeg,png,svg,jpg,webp,gif}').pipe(
    dest('dist/images/')
  );
}

function devCss() {
  return src('src/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('src/css/'));
}

function devTs() {
  return src('src/js/ts/*.ts')
    .pipe(typescript({ noImplicitAny: true }))
    .pipe(dest('src/js/'));
}

function devWatch() {
  gulp.watch('src/css/**/*.scss', devCss);
  gulp.watch('src/js/**/*.ts', devTs);
}

const devBuild = gulp.parallel(devCss, devTs);

const dev = gulp.parallel(devBuild, devWatch);
exports.dev = dev;

function clean() {
  return del('./dist/');
}
exports.clean = clean;

const build = gulp.series(
  clean,
  devBuild,
  gulp.parallel(html, css, js, images)
);
exports.build = build;
