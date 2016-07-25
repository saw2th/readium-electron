var webpack = require('webpack');

module.exports = {
    context: __dirname + '/app/main',
    entry: {
        main : './app.js'
    },
    externals: [
        {
            'fs': true, 
            'path': true, 
            'urijs': true, 
            'jszip': true
        }
    ],

    output: {
        filename: 'main.js',
        path: __dirname + '/build'
    },
    
    target: "electron",

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