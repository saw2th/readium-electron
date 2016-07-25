var webpack = require('webpack');

module.exports = {
    context: __dirname + '/app/renderer',
    target: "electron-renderer",
    devtool: "source-map",
    entry: {
        vendor: [
            'fs', 'path', 'process',
            'parse-epub',
            'react-redux', 'redux', 'redux-storage', 'redux-storage-engine-localstorage',
            'react', 'react-dom', "readium-js"
        ],
        renderer: './app.jsx'
    },
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
                test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader : "file-loader"
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'renderer.vendor.js')
    ]
};