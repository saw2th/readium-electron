var webpack = require('webpack');
var process = require("process");

var plugins = [
];

if (process.env.ENVIRONMENT == "DEV") {
    // Dev environment
    process.env.APP_ENTRY_RELATIVE_URL = "/../renderer/index.html";
} else {
    // Prod environment
    process.env.APP_ENTRY_RELATIVE_URL = "/index.html";
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })    
    );
}

module.exports = {
    context: __dirname + '/app/main',
    entry: {
        main : './app.js'
    },

    output: {
        filename: 'main.js',
        path: __dirname + '/build'
    },

    node: {
        __dirname: false,
        __filename: false
    },
    
    target: "electron-main",

    plugins: plugins,

    module: {
        loaders: [
            { 
                test: /\.js$/, 
                loader: 'babel-loader', 
                exclude: /node_modules/, 
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            }
        ]
    }
};  