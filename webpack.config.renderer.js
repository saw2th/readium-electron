var webpack = require('webpack');

module.exports = {
    context: __dirname + '/app/renderer',
    entry: './app.jsx',
    devtool: 'source-map',
    target: "electron-renderer",
    
    output: {
        filename: 'renderer.js',
        path: __dirname + '/build',
        publicPath: 'http://localhost:8080/build/'
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
                exclude: [/node_modules/, /readium-js/], 
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
            }
        ]
    }
};