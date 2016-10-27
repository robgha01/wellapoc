module.exports = function (gulp, options, plugins) {
    gulp.task("watch", function () {
        options.webpack.requiredWebpack.watch = true;
        gulp.watch(options.paths.scripts, ["typescript"]);
        gulp.watch(options.paths.styles, ["compile:scss"]);
    });
};