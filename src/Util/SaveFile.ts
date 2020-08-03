import { PathLike } from "fs";

var fs = require("fs");

export function saveFile(data: String, path: PathLike): Promise<boolean> {
  return new Promise((resolve, reject) => {
    fs.writeFile(path,data, { flag: "w", encoding: "utf-8" }, function (err) {
      resolve(err == null);
    });
  });
}
