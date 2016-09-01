import builder, {Platform} from "electron-builder";
import os from "os";

let targets = null;
let extraFiles = null;

switch (os.platform()) {
  case "linux":
    targets =Platform.LINUX.createTarget(["deb"]);
    extraFiles = "library/linux/libreadium.so";
    break;
  case "win32":
    targets = Platform.WINDOWS.createTarget(["nsis"]);
    break;
  case "darwin":
    targets = Platform.MAC.createTarget(["dmg"]);
    extraFiles = "library/mac/libreadium.dylib";
    break;
}

// Promise is returned
builder.build({
  targets: targets,
  devMetadata: {
    directories: {
      "app": "build",
      "buildResources": "assets"
    },
    build: {
      "appId": "readium.electron",
      "app-category-type": "ebook",
      "npmRebuild": false,
      "extraFiles": extraFiles,
      "win": {
        "icon": "assets/win/app.ico"
      },
      "nsis": {
        "oneClick": false
      }
    }
  }
})
  .then(() => {
    console.log("## Done");
    // handle result
  })
  .catch((error) => {
    console.error("## error", error);
    // handle error
  })
