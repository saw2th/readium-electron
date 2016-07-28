import rmdir from "rmdir";
import path from "path";
import { exec } from "child_process";
import fs from "fs";

// Clean directory
function clean(dirPath, next) {
  console.log(`Cleaning ${dirPath}  directory ...`);
  fs.stat(dirPath, (err, stats) => {
    if (err) {
      console.log(`${dirPath} directory does not exist`);
      next();
    } else {
      rmdir(dirPath,  (err, dirs, files) => {
        if (err) {
          console.log(`Unable to clean ${dirPath} directory.`);
        } else {
          console.log(`${dirPath} directory cleaned.`);
          next();
        }
      });
    }
  });
}

// Run npm command
function run(command, next) {
  console.log(`Start ${command} ...`);
  exec(command, (err, stdout) => {
    if (err) {
      console.error(`Unable to run ${command}`);
    } else {
      console.log(`${command} done.`);
      next();
    }
  });
}

// Copy package json
function copyPackageJson(next) {
  console.log("Copy package.json...")
  fs.createReadStream(path.normalize("app/package.json")).pipe(
    fs.createWriteStream(path.normalize("build/package.json"))
      .on("error", () => {
        console.error("Unable to copy package.json");
      })
      .on("close", () => { 
        console.log("package.json copied.");
        next(); 
      })
  );
}
// Package workflow
clean(path.normalize(__dirname + '/build'), () => {
  run("npm run build-readium", () => {
    run("npm run build-main", () => {
      run("npm run build-renderer", () => {
        copyPackageJson(() => {});
      })
    })
  })
});