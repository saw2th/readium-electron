import builder, {Platform} from "electron-builder";

// Promise is returned
builder.build({
  targets: Platform.LINUX.createTarget(["deb"]),
  devMetadata: {
    directories: {
      "app": "build",
      "buildResources": "assets"
    },
    build: {
      "appId": "readium.electron",
      "app-category-type": "ebook",
      "npmRebuild": false
    }
  }
})
  .then(() => {
    console.log("Done");
    // handle result
  })
  .catch((error) => {
    console.error("error");
    // handle error
  })