module.exports = function(gulp, options, plugins) {
    gulp.task("compile:scss",
        function () {
            return gulp.src(options.sass.getGlobPath())
                .pipe(plugins.compass({
                    config_file: options.ruby.configFile,
                    css: options.sass.outPath,
                    sass: options.sass.stylesFolder
                }))
                .on("error",
                    function(error) {
                        // Would like to catch the error here 
                        console.log(error);
                        this.emit("end");
                    })
                .pipe(plugins.cleanCss({
                    sourceMap: true,
                    target: options.sass.outPath
                }))
                .pipe(gulp.dest(options.sass.outPath));
        });
};