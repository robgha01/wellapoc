var CompassOptions = require("compass-options");
var RubyConfigPath = "./config.rb";
var Dirs = CompassOptions.dirs({
    "config": RubyConfigPath,
    "trailing": false //  Whether or not to include a trailing slash for directories 
});

function GetGlobPath(withChildFolder) {
    if (withChildFolder == undefined || withChildFolder === "") {
        return this.sourcePath + this.glob;
    }
    return this.sourcePath + withChildFolder + "/" + this.glob;
}

var TypescriptLocations = ["typescript"];
var TypescriptTemps = [];

var Exports = module.exports = {
    pattern: ["gulp/tasks/**/*.js"],
    typescript: {
        scripts: TypescriptLocations,
        temps: TypescriptTemps,
        sourcePath: "./assets/typescript/",
        outNamePrefix: "",
        outPath: "./assets/js/compiled/",
        outPathDefinitions: "./assets/js/compiled/"
    },
    sass: {
        sourcePath: "./assets/sass/",
        glob: ["**/*.scss"],
        outPath: "./assets/stylesheets/",
        stylesFolder: Dirs.sass
    },
    ruby: {
        configFile: RubyConfigPath
    },
    webpack: {
        requiredInstance: require("webpack"),
        config: require("../webpack.config.js")
    }
}
Exports.typescript.getGlobPath = GetGlobPath;
Exports.sass.getGlobPath = GetGlobPath;