var webpack = require('webpack');

module.exports = {
    context: __dirname + '/node_modules/zip-js/WebContent',
    entry: "./zip.js", 

    output: {
        library: "new-zip-js",
        libraryTarget: "commonjs2",
        filename: 'zip.js',
        pathinfo: true,
        path: __dirname + '/build'
    },
   
    resolve: {
        extensions: ['', '.js'],
        alias: {
            "zip_fs_extend": "zip-js/WebContent/zip-fs.js",   
            "zip_ext_extend": "zip-js/WebContent/zip-ext.js",
            "zip_inflate_extend": "zip-js/WebContent/inflate.js" 
        }
    },
    module: {
        loaders: [
            {
                test: /zip\.js$/,
                loader: 'string-replace',
                query: {
                    multiple: [
                        { search: '(function(obj) {', replace: 'define([], function() { var obj = {zip: null}; '},
                        { search: '})(this);', replace: ' zip = obj.zip; zip_inflate_extend(zip); zip_fs_extend(zip); zip_ext_extend(zip); return zip; });'}
                    ]
                }
            },
            {
                test: /zip-fs\.js$/,
                loader: 'string-replace',
                query: {
                    multiple: [
                        { search: '(function() {', replace: 'define([], function() { var zip_extend = function(zip) {'},
                        { search: '})();', replace: '}; return zip_extend;})'}
                    ]
                }
            },
            {
                test: /zip-ext\.js$/,
                loader: 'string-replace',
                query: {
                    multiple: [
                        { search: '(function() {', replace: 'define([], function() { var zip_extend = function(zip) {'},
                        { search: '})();', replace: '}; return zip_extend;})'}
                    ]
                }
            },
            {
                test: /inflate\.js$/,
                loader: 'string-replace',
                query: {
                    multiple: [
                        { search: 'var env = global.zip || global;', replace: 'var env = zip;'},
                        { search: '(function(global) {', replace: 'define([], function() { var zip_extend = function(zip) {'},
                        { search: '})(this);', replace: '}; return zip_extend;})'}
                    ]
                }
            },
            {
                test: /zip\.js$/,
                loader: 'imports?zip_fs_extend=zip_fs_extend,zip_ext_extend=zip_ext_extend'
            },
            {
                test: /zip\.js$/,
                loader: 'imports?zip_inflate_extend=zip_inflate_extend'
            }
        ]
    }
};