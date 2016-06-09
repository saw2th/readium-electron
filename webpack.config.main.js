module.exports = {
    context: __dirname + '/app/main',
    entry: './app.js',

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