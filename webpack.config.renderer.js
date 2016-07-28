var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var process = require("process");

// Resources that vary depending on environment (prod or dev)
var devtool = null;
var output = {
    filename: 'renderer.js',
    path: __dirname + '/build'
};
var entry = {
    renderer: './app.jsx'
};
var plugins = [
    new HtmlWebpackPlugin({
        title: "Readium",
        template: "index.ejs"
    })
];

if (process.env.ENVIRONMENT == "DEV") {
    // Dev environment
    devtool = "source-map";
    output.publicPath = "http://localhost:8080/build/";
    entry.vendor = [
        'fs', 'path', 'process',
        'parse-epub',
        'react-redux', 'redux', 'redux-storage', 'redux-storage-engine-localstorage',
        'react', 'react-dom', "readium-js"
    ];
    plugins.push(
        new webpack.optimize.CommonsChunkPlugin('vendor', 'renderer.vendor.js')
    );
} else {
    // Prod environment
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })    
    );
}

module.exports = {
    context: __dirname + '/app/renderer',
    target: "electron-renderer",
    devtool: devtool,

    entry: entry,

    output: output,

    node: {
        __dirname: false,
        __filename: false
    },

    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            "readium-js": __dirname + "/build/readium.js"
        }
    },

    module: {
        loaders: [
            { 
                test: /\.jsx?$/, 
                loader: 'babel-loader', 
                exclude: [/node_modules/, /readium.js/], 
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            }, 
            { 
                test: /\.scss$/, 
                loader: 'style-loader!css-loader!sass-loader' 
            },
            { 
                test: /\.json$/, 
                loader: "json-loader"
            },
            { 
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                loader: "url-loader?name=[name].[ext]&limit=10000&mimetype=application/font-woff" 
            },
            { 
                test: /\.html$/, 
                loader: "file?name=[name].[ext]" 
            },
            { 
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                loader: "file?name=[name].[ext]" 
            }
        ]
    },

    plugins: plugins
};