let gulp = require("gulp");
let gulpTaskListing = require("gulp-task-listing");

gulp.task(
  "help",
  gulpTaskListing.withFilters(function (task) {
    return (
      task !== "build" &&
      task !== "watch" &&
      task !== "support" &&
      task !== "help" &&
      task !== "supportapp"
    );
  })
);
