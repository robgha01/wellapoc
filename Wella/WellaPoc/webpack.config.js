var Path = require("path"),
    Webpack = require("webpack"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    NodeExternals = require("webpack-node-externals");

function IsExternal(module) {
    var userRequest = module.userRequest;

    if (typeof userRequest !== "string") {
        return false;
    }

    return userRequest.indexOf("bower_components") >= 0 ||
           userRequest.indexOf("node_modules") >= 0 ||
           userRequest.indexOf("libraries") >= 0;
}

var Dirs = {
    appModulesRoot: Path.resolve(__dirname, "assets", "typescript"),
    nodeModulesRoot: Path.resolve(__dirname, "node_modules")
}

var Externals = [NodeExternals()];
Externals.push({
    // require("jquery") is external and available
    //  on the global var jQuery
    "jquery": "jQuery"
});

//var TsConfigPathsPlugin = require("awesome-typescript-loader").TsConfigPathsPlugin;

// BugFix: this is needed to sort in correct order of the chunks. can remove when this is fixed: (https://github.com/ampedandwired/html-webpack-plugin/pull/423)
var OrderByList = function (list) {
    return function (chunk1, chunk2) {
        var index1 = list.indexOf(chunk1.names[0]);
        var index2 = list.indexOf(chunk2.names[0]);
        if (index2 == -1 || index1 < index2) {
            return -1;
        }
        if (index1 == -1 || index1 > index2) {
            return 1;
        }
        return 0;
    };
};

module.exports = {
    target: "node",

    entry: {
        Vendor: "./assets/typescript/Vendor.ts",
        Start: "./assets/typescript/Start.ts",
        Search: "./assets/typescript/Search.ts",
        Profile: "./assets/typescript/Profile.ts",
        Login: "./assets/typescript/Login.ts",
        Courses: "./assets/typescript/Courses.ts",
        Calendar: "./assets/typescript/Calendar.ts"
    },

    externals: Externals,

    output: {
        filename: "[name].js",
        path: Path.resolve(__dirname, "./dist")
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolveLoader: {
        modules: ["node_modules"]
    },

    resolve: {
        //plugins: [
        //    new TsConfigPathsPlugin()
        //],

        modules: [Dirs.appModulesRoot, Dirs.nodeModulesRoot],

        descriptionFiles: ["package.json"],

        extensions: [".ts", ".es6", ".js", ".json"],

        enforceExtension: false
    },

    plugins: [
        new Webpack.optimize.CommonsChunkPlugin({
            name: "Common",
            children: true,
            minChunks: function(module, count) {
                return !IsExternal(module) && count >= 2; // adjustable cond
            }
        }),
        new Webpack.optimize.CommonsChunkPlugin({
            name: "Vendor",
            children: true,
            chunks: ["Common"],
            minChunks: function(module) {
                return IsExternal(module);
            }
        }),
        new HtmlWebpackPlugin({
            filename: "Start.html",
            template: "pages/Start.html",
            chunks: ["Vendor", "Common", "Start"],
            chunksSortMode: OrderByList(["Vendor", "Common", "Start"]),
            inject: "body"
        }),
        new HtmlWebpackPlugin({
            filename: "Search.html",
            template: "pages/Search.html",
            chunks: ["Vendor", "Common", "Search"],
            chunksSortMode: OrderByList(["Vendor", "Common", "Search"]),
            inject: "body"
        }),
        new HtmlWebpackPlugin({
            filename: "Profile.html",
            template: "pages/Profile.html",
            chunks: ["Vendor", "Common", "Profile"],
            chunksSortMode: OrderByList(["Vendor", "Common", "Profile"]),
            inject: "body"
        }),
        new HtmlWebpackPlugin({
            filename: "Login.html",
            template: "pages/Login.html",
            chunks: ["Vendor", "Common", "Login"],
            chunksSortMode: OrderByList(["Vendor", "Common", "Login"]),
            inject: "body"
        }),
        new HtmlWebpackPlugin({
            filename: "Courses.html",
            template: "pages/Courses.html",
            chunks: ["Vendor", "Common", "Courses"],
            chunksSortMode: OrderByList(["Vendor", "Common", "Courses"]),
            inject: "body"
        }),
        new HtmlWebpackPlugin({
            filename: "Calendar.html",
            template: "pages/Calendar.html",
            chunks: ["Vendor", "Common", "Calendar"],
            chunksSortMode: OrderByList(["Vendor", "Common", "Calendar"]),
            inject: "body"
        }),
        new Webpack.optimize.DedupePlugin()
    ],
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /(node_modules|typings)/,
                use: [
                    {
                        loader: "source-map-loader"
                    }
                ]
            },
            { test: /\.ts$/, exclude: /node_modules/, loader: "ts" },
            { test: /\.json$/, loader: "json" },
            { test: /\.html/, loader: "html?minimize=false" },
            { test: /\.css$/, loader: "style!css" },
            { test: /\.(gif|png|jpe?g)$/i, loader: "file?name=assets/images/[name].[ext]" },
            {
                test: /\.woff2?$/,
                loader: "url?name=assets/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff"
            },
            { test: /\.(ttf|eot|svg)$/, loader: "file?name=assets/fonts/[name].[ext]" }
        ]
    }
};