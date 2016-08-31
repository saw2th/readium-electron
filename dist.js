import builder, {Platform} from "electron-builder";
import os from "os";

var targets = null;

switch (os.platform()) {
  case "linux":
    targets =Platform.LINUX.createTarget(["deb"]);
    break;
  case "win32":
    targets = Platform.WINDOWS.createTarget(["nsis"]);
    break;
  case "darwin":
    targets = Platform.MAC.createTarget(["dev"]);
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
      "extraFiles": "library/linux/libreadium.so",
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
