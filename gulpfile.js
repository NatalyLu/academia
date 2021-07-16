const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const htmlmin = require("gulp-htmlmin");
const terser = require("gulp-terser-js");
const sync = require("browser-sync").create();
const del= require('del');
const concat = require('gulp-concat');

// HTML

const html = () => {
  return gulp.src("source/**/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"));
};

exports.html = html;

// Styles

const styles = () => {
  return gulp.src("source/less/style.less")
  .pipe(plumber())
  .pipe(sourcemap.init())
  .pipe(less())
  .pipe(postcss([autoprefixer()]))
  .pipe(gulp.dest("build/css"))
  .pipe(postcss([csso()]))
  .pipe(sourcemap.write("."))
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("build/css"))
  .pipe(sync.stream());
};

exports.styles = styles;

// Scripts

const scripts = () => {
  return gulp.src("source/js/*.js")
    .pipe(concat("script.js"))
    .pipe(gulp.dest("build/js/"))
    .pipe(terser({
      mangle: {
        toplevel: true
      }
    }))
    .on('error', function (error) {
      this.emit('end')
    })
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
}

exports.scripts = scripts;

// Images

const optimizeImages = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
  .pipe(imagemin([
    imagemin.mozjpeg({progressive: true}),
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest("build/img"))
};

exports.optimizeImages = optimizeImages;

const copyImages = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
  .pipe(gulp.dest("build/img"))
};

exports.copyImages = copyImages;

// WebP

const createWebp = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("build/img"))
};

exports.createWebp = createWebp;

// Sprite

const sprite = () => {
return gulp.src("source/img/svg/*.svg")
.pipe(svgstore({
  inlineSvg: true
}))
.pipe(rename("sprite.svg"))
.pipe(gulp.dest("build/img/svg/"));
};

exports.sprite = sprite;

// Copy

const copy = (done) => {
  gulp.src([
    "source/*.{xml,png,ico,svg,webmanifest}",
    "source/img/**/*.{jpg,png,svg}",
    // "source/js/script.js",
    "source/js/jquery/jquery-3.6.0.min.js",
    "source/phpmailer/*",
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"))
  done();
};

exports.copy = copy;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

exports.server = server;

// Reload

const reload = done => {
  sync.reload();
  done();
};

// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series(styles));
  gulp.watch("source/*.html", gulp.series(html, reload));
};

// Clean

const clean = () => {
  return del("build");
};

exports.clean = clean;

// Build

const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    sprite,
    createWebp
  ),
);

exports.build = build;

// Default

exports.default = gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    sprite,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  )
);
