/// <binding BeforeBuild='default' />
var gulp = require("gulp");
var plugins = require("gulp-load-plugins")({ pattern: ["gulp-*", "gulp.*", "vinyl-*", "del", "event-stream", "webpack-stream", "merge-stream"] });
require("load-gulp-tasks")(gulp, require("./gulp/config"), plugins);

gulp.task("default", plugins.sequence("typescript", "webpack", "clean:Temp"));