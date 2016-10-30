module.exports = function(gulp, options, plugins) {
    gulp.task("webpack",
        function () {
            return gulp.src([options.typescript.sourcePath + "**/*.ts", "!_references.ts"])
                .pipe(plugins.vinylNamed())
                .pipe(plugins.webpackStream(options.webpack.config,
                    options.webpack.requiredInstance,
                    function(err, stats) {
                            if (err) {
                                throw new plugins.util.PluginError("webpack", err);
                            }
                            plugins.util.log("[webpack]", stats.toString({
                                // output console options
                                colors: true
                            }));
                    }))
                .pipe(gulp.dest(options.projectOutPath));
        });
};