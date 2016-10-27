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

var TypescriptLocations = ["Resources", "Services", "Directives", "Controllers"];
var TypescriptTemps = ["Abstraction", "Extensions"].concat(TypescriptLocations);

var Exports = module.exports = {
    pattern: ["gulp/tasks/**/*.js"],
    typescript: {
        scripts: TypescriptLocations,
        temps: TypescriptTemps,
        sourcePath: "./App_Plugins/BlueLeet.UComponents/Source/",
        importPrefix: "import.ts",
        outNamePrefix: "BlueLeet.UComponents.",
        outPath: "./App_Plugins/BlueLeet.UComponents/assets/js/",
        outPathDefinitions: "./App_Plugins/BlueLeet.UComponents/assets/js/"
    },
    sass: {
        sourcePath: "./App_Plugins/BlueLeet.UComponents/Source/Sass/",
        glob: ["**/*.scss"],
        outPath: "./App_Plugins/BlueLeet.UComponents/assets/stylesheets/",
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