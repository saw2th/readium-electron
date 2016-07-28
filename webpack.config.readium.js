var webpack = require('webpack');

module.exports = {
    context: __dirname + '/readium-js',
    entry: './js/Readium.js', 

    output: {
        library: "readium-js",
        libraryTarget: "commonjs2",
        filename: 'readium.js',
        pathinfo: true,
        path: __dirname + '/build'
    },
    plugins: [
        new webpack.DefinePlugin({
            READIUM_VERSION: "1.0.0"
        })      
    ],

    resolve: {
        extensions: ['', '.js'],
        alias: {
            "version.json": __dirname + "/readium-js/build-output/version.json",
            "jquerySizes": "jquery-sizes/lib/jquery.sizes.js",
            //"zip-ext": __dirname + "/build/zip.js",
            "URIjs": "urijs",
            "cryptoJs/sha1": "crypto-js/sha1",
            "eventEmitter": "eventemitter3",
            "readium_js": __dirname + "/readium-js/js",
            "readium_globals_js": __dirname + "/readium-js/readium-shared-js/js/globals.js",
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
                    multiple: [
                        { search: 'var package = ', replace: 'var oPackage = ' },
                        { search: 'var smil = package', replace: 'var smil = oPackage' }
                    ]
                }
            },
            {
                test: /publication_fetcher\.js$/,
                loader: 'string-replace',
                query: {
                    multiple: [
                        // Always use plain fetcher
                        { search: " ZipResourceFetcher,", replace: "" },
                        { search: " '\./zip_resource_fetcher',", replace: "" },
                        { search: "if (isExploded) {", replace: 'if (true) {' }
                        
                    ]
                }
            },
            {
                test: /loader\.js$/,
                loader: 'string-replace',
                query: {
                    multiple: [
                        { search: "$('svg', doc).load(function(){", replace: '$("svg", doc).on("load", function(){' }
                    ]
                }
            },
            {
                test: /media_overlay\.js$/,
                loader: 'string-replace',
                query: {
                    multiple: [
                        { search: 'function(package)', replace: 'function(oPackage)'},
                        { search: 'this.package = package', replace: 'this.package = oPackage'}
                    ]
                }
            },
            {
                test: /Readium\.js$/,
                loader: 'imports?ReadiumSDK=readium_globals_js,URI=urijs'
            },
            {
                test: /jquery\.sizes\.js$/,
                loader: 'imports?jQuery=jquery'
            },
            {
                test: /iframe_zip_loader\.js$/,
                loader: 'imports?$=jquery'
            },
            {
                test: /encryption_handler\.js$/,
                loader: 'imports?$=jquery'
            },
            {
                test: /cfi_navigation_logic\.js$/,
                loader: 'imports?ReadiumSDK=readium_globals_js'
            },
            {
                test: /iframe_loader\.js$/,
                loader: 'imports?URI=urijs'
            }
        ]
    }
};