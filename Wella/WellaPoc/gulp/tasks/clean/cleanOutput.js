module.exports = function(gulp, options, plugins) {
    gulp.task("clean:Output",
        function () {
            return plugins.del([options.projectOutPath]);
        });
};