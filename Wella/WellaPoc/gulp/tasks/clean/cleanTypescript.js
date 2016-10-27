module.exports = function(gulp, options, plugins) {
    gulp.task("clean:typescript",
        function () {
            return plugins.del(options.typescript.outPath + "**/*");
        });
};