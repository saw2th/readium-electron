var webpack = require('webpack');

module.exports = {
    context: __dirname + '/readium-js/js',
    entry: './Readium.js',
    target: "node",
    
    output: {
        library: "readium-js",
        libraryTarget: "commonjs2",
        filename: 'readium.js',
        path: __dirname + '/build'
    },

    resolve: {
        extensions: ['', '.js'],
        alias: {
            "version.json": __dirname + "/readium-js/build-output/version.json",
            "jquerySizes": "jquery-sizes/lib/jquery.sizes.js",
            "zip-ext": "zip-js/WebContent/zip.js",
            "cryptoJs/sha1": "crypto-js/sha1",
            "eventEmitter": "eventemitter3",
            "readium_js": __dirname + "/readium-js/js",
            "readium_shared_js": __dirname + "/readium-js/readium-shared-js/js",
            'readium_cfi_js/cfi_parser': __dirname + "/readium-js/readium-shared-js/readium-cfi-js/js/cfi_API.js",
            "readium_cfi_js": __dirname + "/readium-js/readium-shared-js/readium-cfi-js/js/cfi_API.js"
        }
    },
    module: {
        loaders: [
            {
                test: /reader_view\.js$/,
                loader: 'string-replace',
                query: {
                search: 'var package = ',
                replace: 'var oPackage = '
                }
            },
            {
                test: /reader_view\.js$/,
                loader: 'string-replace',
                query: {
                search: 'var smil = package',
                replace: 'var smil = oPackage'
                }
            },
            {
                test: /media_overlay\.js$/,
                loader: 'string-replace',
                query: {
                search: 'this.package = package',
                replace: 'this.package = oPackage'
                }
            },
            {
                test: /media_overlay\.js$/,
                loader: 'string-replace',
                query: {
                search: 'function(package)',
                replace: 'function(oPackage)'
                }
            }
        ]
    }
};