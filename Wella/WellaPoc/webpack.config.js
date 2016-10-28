var Webpack = require("webpack"),
    RuntimePlugin = require("runtime-webpack-plugin");

function IsExternal(module) {
    var userRequest = module.userRequest;

    if (typeof userRequest !== "string") {
        return false;
    }

    return userRequest.indexOf("bower_components") >= 0 ||
           userRequest.indexOf("node_modules") >= 0 ||
           userRequest.indexOf("libraries") >= 0;
}

module.exports = {
    entry: {
        "Start": __dirname + "\\assets\\js\\Start.js",
        "Search": __dirname + "\\assets\\js\\Search.js",
        "Profile": __dirname + "\\assets\\js\\Profile.js",
        "Login": __dirname + "\\assets\\js\\Login.js",
        "Courses": __dirname + "\\assets\\js\\Courses.js",
        "Calendar": __dirname + "\\assets\\js\\Calendar.js"//,
        //"Vendors": ["rangeslider.js"]
    },
    externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
        "jquery": "jQuery"
    },

    output: {
        filename: "[name].js",
        path: __dirname + "\\assets\\js\\"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    plugins: [
        new Webpack.optimize.CommonsChunkPlugin({
            name: "Common",
            children: true,
            minChunks: function (module, count) {
                return !IsExternal(module) && count >= 2; // adjustable cond
            }
        }),
        new Webpack.optimize.CommonsChunkPlugin({
            name: "Vendors",
            children: true,
            chunks: ["Common"],
            minChunks: function (module) {
                return IsExternal(module);
            }
        }),
        new RuntimePlugin("Initial")
    ],
    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            //{ test: /\.tsx?$/, exclude: /(node_modules|bower_components)/, loader: "babel-loader" }
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader"
            }
        ],
        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: "source-map-loader" }
        ]
    }
};