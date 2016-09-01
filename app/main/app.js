import {app, protocol, session, ipcMain, BrowserWindow } from "electron";
import electron from "electron";
import JSZip from "jszip";
import fs from "fs";
import path from "path";
import process from "process";
import os from "os";

// Register readium sdk
let readiumPluginPath = "";

switch (os.platform()) {
  case "linux":
    if (process.env.ENVIRONMENT === 'DEV') {
      readiumPluginPath = path.resolve(__dirname, "../../out/Default/lib", "libreadium.so");
    } else {
      readiumPluginPath = path.resolve(__dirname, "../../library", "linux", "libreadium.so");
    }
    break;
  case "win32":
    readiumPluginPath = path.resolve(__dirname, "../../library", "win", "readium.dll");
    break;
  case "darwin":
    if (process.env.ENVIRONMENT === 'DEV') {
      readiumPluginPath = path.resolve(__dirname, "../../out/Default", "libreadium.dylib");
    } else {
      readiumPluginPath = path.resolve(__dirname, "../../library", "mac", "libreadium.dylib");
    } 
    break;
}

if (!fs.existsSync(readiumPluginPath)) {
  console.log("Unable to find readium plugin");
  app.quit();
}

app.commandLine.appendSwitch("register-pepper-plugins", readiumPluginPath + ";application/x-ppapi-readium");

// Keep a global reference of the window object, if you don"t, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != "darwin") {
      app.quit();
  }
});

// Implements callback feature for the communication of
// main process <=> renderer process
var ipcCallbackMapping = {};
var ipcCallbackId = 0;

function ipcSendWithCallback(request, callback) {
  let id = ipcCallbackId++;
  ipcCallbackMapping[id] = callback;
  mainWindow.webContents.send("ipc:callback:request", id, request);
}

ipcMain.on("ipc:callback:response", (event, id, response) => {
  let callback = ipcCallbackMapping[id];
  callback(response);
  delete ipcCallbackMapping[id];
});

// Read content in epub
function readZipContent(epubPath, epubContentPath, callback) {
  // Read zip content using readium sdk that is embed in browser view as a ppapi plugin
  ipcSendWithCallback({
    readiumSdkCommand: "container:readStream",
    readiumSdkData: {
      "path": epubPath,
      "contentPath": epubContentPath
    }},
    (data) => {
      callback(data);
    }
  );
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on("ready", function() {
  /*protocol.interceptHttpProtocol('http', function(req, callback) {
      console.log(req);
      callback(null);
      return null;
    }
  );*/

  // Fake http server for epub files
  protocol.registerBufferProtocol("epub", function(request, callback) {
    var epubPath = request.url.substring(7);
    epubPath = path.normalize(epubPath);
    console.log("epub: serve file", epubPath);

    if (epubPath.indexOf(".epub/") > 0 ||
        epubPath.indexOf(".epub\\") > 0 ) {
      // Read zipped epub
      var epubPathEndIndex = epubPath.indexOf(".epub") + 5;
      var epubFilePath = epubPath.substr(0, epubPathEndIndex);
      var epubContentPath = epubPath.substr(epubPathEndIndex + 1);

      // Fix windows path
      if (os.platform() == "win32" && epubFilePath.indexOf("C\\") == 0) {
        epubFilePath = epubFilePath.replace("C\\", "C:\\");
      }

      // Replace back slash by slash
      epubContentPath = epubContentPath.replace(/\\/g, "/");

      readZipContent(epubFilePath, epubContentPath, (data) => {
          callback(data);
      });
    } else {
      fs.readFile(epubPath, function (err, data ) {
        callback(data);
      });

    }
  }, function (error) {
      if (error)
          console.error("Failed to register protocol");
  });
  /*
  protocol.registerStringProtocol("epub-exploded", function(request, callback) {
      var epubFullPath = request.url.substr(15);
      var epubPathEndIndex = epubFullPath.indexOf(".epub") + 5;
      var epubPath = epubFullPath.substr(0, epubPathEndIndex);
      var epubContentPath = epubFullPath.substr(epubPathEndIndex + 1);
      console.log("epub-exploded:", epubPath, epubContentPath);

      readZipContent(epubPath, epubContentPath, function(data) {
        callback(data);
      });
  }, function (error) {
      if (error)
          console.error("Failed to register protocol");
  });*/


  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000, height: 600,
    webPreferences: {
      plugins: true
    }
  });

  // Hide menu
  mainWindow.setMenu(null);

  // and load the entry html page
  console.log(process.env.APP_ENTRY_RELATIVE_URL);
  mainWindow.loadURL("epub://" + path.normalize(__dirname + process.env.APP_ENTRY_RELATIVE_URL));

  /*session.defaultSession.webRequest.onBeforeRequest((details, callback) => {
    var url = details.url;

    if (url.startsWith("http://epub.local")) {
      var url = "epub://" + url.substr(17);
      return callback({cancel: false, redirectURL: url});
    }

    return callback({cancel: false});
  });*/

  // Only open dev tools in dev environment
  if (process.env.ENVIRONMENT === 'DEV') {
    // Open the DevTools.
    mainWindow.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
