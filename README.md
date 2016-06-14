Readium + Electron
##################

npm install

npm run build-watch

npm run electron-dev

Debug with visual studio code 
{
    "name": "Launch Electron",
    "type": "node",
    "program": "${workspaceRoot}/app/main.js", // this is important
    "stopOnEntry": false,
    "args": [] 
    "cwd": "${workspaceRoot}",
    // as you have noted, this is also important:
    "runtimeExecutable": "${workspaceRoot}/node_modules/electron-prebuilt/dist/electron.exe",
    "runtimeArguments": [],
    "env": { },
    "sourceMaps": false,
}, 


    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],