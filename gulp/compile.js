let gulp = require("gulp");
let $ = require("gulp-load-plugins")();
let del = require("del");
let path = require("path");
let through = require("through2");
let gutil = $["util"];
let babel = $["babel"];
let ext = require("ext-ext");
let fs = require("fs");
let _ = require("underscore");

let babelConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../.babelrc"), "utf8")
);
babelConfig = _.extend(babelConfig, {
  sourceMap: false
});

function relPath(file) {
  return path.relative(".", file);
}

function logFileHelpers(logMessage) {
  return through.obj(function (file, enc, cb) {
    let src = file.history[0];
    let dest = file.history[1];

    gutil.log(
      logMessage,
      gutil.colors.green(
        relPath(src) + gutil.colors.grey(" -> ") + relPath(dest)
      )
    );
    cb(null, file);
  });
}

// function logInjectHelpers (logMessage) {
//   return through.obj(function (file, enc, cb) {
//     let src = file.history[0]
//
//     gutil.log(logMessage, gutil.colors.grey(' -> '), gutil.colors.green(relPath(src)))
//     cb(null, file)
//   })
// }

function onChange(event) {
  gutil.log("-------");
  gutil.log("File changed:", gutil.colors.grey(relPath(event.path)));

  let filePath = event.path;
  let fileExt = ext(event.path, {extDot: "last"});

  if (fileExt === ".js") {
    return gulp
      .src(filePath, {base: "src"})
      .pipe(babel(babelConfig))
      .pipe(gulp.dest(gulp.opts.destDir))
      .pipe(logFileHelpers("Compiling (Babel):"));
  } else {
    return gulp
      .src(filePath, {base: "src"})
      .pipe(gulp.dest(gulp.opts.destDir))
      .pipe(logFileHelpers("Copy (Other): "));
  }
}

gulp.task("clean", function () {
  gutil.log("Cleaning:", $.util.colors.green(gulp.opts.destDir));
  return del.sync([gulp.opts.destDir]);
});

gulp.task("copy", function () {
  return (
    gulp
      .src([gulp.opts.srcDir + "**/*.*", "!" + gulp.opts.srcDir + "**/*.js"])
      // .pipe(changed(gulp.opts.destDir, {hasChanged: changed.compareContents}))
      .pipe(gulp.dest(gulp.opts.destDir))
      .pipe(logFileHelpers("Copy (Other): "))
  );
});

gulp.task("compile", function () {
  return (
    gulp
      .src(gulp.opts.srcDir + "**/*.js", {base: "src"})
      // .pipe(changed(gulp.opts.destDir, {hasChanged: changed.compareLastModifiedTime}))
      .pipe(babel(babelConfig))
      .pipe(gulp.dest(gulp.opts.destDir))
      .pipe(logFileHelpers("Compiling (Babel):"))
  );
});

// 上生产环境用
gulp.task("build", function (cb) {
  return $.sequence("clean", ["copy", "compile"], cb);
});

// 开发时用
gulp.task("watch", ["build"], function (cb) {
  let allFile = gulp.opts.srcDir + "**/*.*";

  gulp.watch(allFile).on("change", onChange);
});
