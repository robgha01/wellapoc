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
        "Start": __dirname + "\\assets\\js\\compiled\\Start.js",
        "Search": __dirname + "\\assets\\js\\compiled\\Search.js",
        "Profile": __dirname + "\\assets\\js\\compiled\\Profile.js",
        "Login": __dirname + "\\assets\\js\\compiled\\Login.js",
        "Courses": __dirname + "\\assets\\js\\compiled\\Courses.js",
        "Calendar": __dirname + "\\assets\\js\\compiled\\Calendar.js"//,
        //"Vendors": ["rangeslider.js"]
    },
    externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
        "jquery": "jQuery"
    },

    output: {
        filename: "[name].js",
        path: __dirname + "\\assets\\js\\compiled\\"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".css", ".png", ".woff", ".woff2", ".eot", ".ttf", ".svg"]
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
            { test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: "babel-loader" },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.png$/, loader: "url-loader?limit=100000&minetype=image/png" },
            { test: /\.jpe?g$|\.gif$|\.svg$|\.woff$|\.woff2$|\.ttf$|\.wav$|\.eot$|\.mp3$/, loader: "file-loader" }
        ],
        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: "source-map-loader" }
        ]
    }
};