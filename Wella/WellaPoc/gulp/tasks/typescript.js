module.exports = function(gulp, options, plugins) {
    gulp.task("typescript",
        ["clean:typescript"],
        function() {
            // var tsconfigPath = process.cwd() + "/App_Plugins/BlueLeet.UComponents/Source/tsconfig.json";
            //var tsconfig = require(tsconfigPath);
            //var defaultConfigs = tsconfig.compilerOptions;
            //var stream = plugins.mergeStream();

            //var vendor = process(options.typescript.sourcePath + options.typescript.vendorScript + ".ts", options.typescript.vendorScript + ".js");
            //stream.add(vendor);

            //var vendor = process(options.typescript.sourcePath + "BlueLeet.UComponents.ts", "BlueLeet.UComponents.js");
            //stream.add(vendor);

            //options.typescript.scripts.forEach(name => {
            //    //var outFile = options.typescript.outNamePrefix + name + ".js";
            //    var blob = options.typescript.sourcePath + name + "/**/*.ts";
            //    var result = process(blob);

            //    stream.add(result);
            //});

            //return stream.isEmpty() ? null : stream;

            var blob = options.typescript.sourcePath + "**/*.ts";
            return process(blob);
        });

    function process(src, outFile) {
        var config = {
            noImplicitAny: false,
            experimentalDecorators: true,
            moduleResolution: "node",
            preserveConstEnums: true,
            declaration: true,
            target: "ES5", // this must be set to the same version as webpack uses with babel.
            module: "commonjs",
            rootDir: options.typescript.sourcePath
        };

        if (config.module !== "commonjs" && outFile != undefined && typeof outFile === "string") {
            config.outFile = outFile;
        } else {
            config.outDir = options.typescript.outPath;
        }

        var tsResult = gulp.src(src).pipe(plugins.typescript(config));
        var merged = plugins.eventStream.merge([
            tsResult.dts.pipe(gulp.dest(options.typescript.outPathDefinitions)),
            tsResult.js.pipe(gulp.dest(options.typescript.outPath))
        ]);

        return merged;
    }
};