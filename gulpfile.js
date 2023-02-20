// 'use strict';
// const { src, dest } = require('gulp');

// const gulp = require('gulp');
// const del = require('del');
// const plumber = require('gulp-plumber');
// const htmlMin = require('gulp-htmlmin');
// const purgeCss = require('gulp-purgecss');
// const cleanCss = require('gulp-clean-css');
// const ts = require('gulp-typescript');

// const srcPath = 'src/';
// const distPath = 'dist/';

// const path = {
//   build: {
//     html: distPath + '',
//     css: distPath + 'assets/css/',
//     js: distPath + 'assets/js/',
//     images: distPath + 'assets/images/',
//     fonts: distPath + 'assets/fonts/',
//   },
//   src: {
//     html: srcPath + '*.html',
//     css: srcPath + 'assets/css/*.css',
//     js: srcPath + 'assets/js/*.{js,ts}',
//     images: srcPath + 'assets/images/**/*.{jpeg,png,svg,jpg,webp,gif}',
//     fonts: srcPath + 'assets/fonts/**/.{eot,woff,woff2,ttf,svg}',
//   },
//   watch: {
//     html: srcPath + '**/*.html',
//     css: srcPath + 'assets/css/**/*.css',
//     js: srcPath + 'assets/js/**/*.{js,ts}',
//     images: srcPath + 'assets/images/**/*.{jpeg,png,svg,jpg,webp,gif}',
//     fonts: srcPath + 'assets/fonts/**/.{eot,woff,woff2,ttf,svg}',
//   },
//   clean: './' + distPath,
// };

// function html() {
//   return src(path.src.html, { base: srcPath })
//     .pipe(plumber())
//     .pipe(htmlMin({ collapseWhitespace: true }))
//     .pipe(dest(path.build.html));
// }
// exports.html = html;

// function css() {
//   return src(path.src.css, { base: srcPath + 'assets/css/' })
//     .pipe(plumber())
//     .pipe(
//       purgeCss({
//         content: [path.watch.html],
//       })
//     )
//     .pipe(cleanCss())
//     .pipe(dest(path.build.css));
// }
// exports.css = css;

// function js() {
//   return src(path.src.js).pipe(plumber()).pipe(dest(path.build.js));
// }
// exports.js = js;

// function images() {
//   return src(path.src.images, { base: srcPath + 'assets/images/' })
//     .pipe(plumber())
//     .pipe(dest(path.build.images));
// }
// exports.images = images;

// function clean() {
//   return del(path.clean);
// }
// exports.clean = clean;

// const build = gulp.series(clean, gulp.parallel(html, css, js, images));
// exports.build = build;

// function watchFiles() {
//   gulp.watch([path.watch.html], html);
//   gulp.watch([path.watch.css], css);
//   gulp.watch([path.watch.js], js);
// }

// const watch = gulp.parallel(build, watchFiles);
// exports.watch = watch;

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

const build = gulp.series(
  clean,
  devBuild,
  gulp.parallel(html, css, js, images)
);
exports.build = build;

function clean() {
  return del('./dist/');
}
exports.clean = clean;
