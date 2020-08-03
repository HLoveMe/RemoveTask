var fs = require("fs");

function saveErrorFile(value: String) {
  return new Promise((resolve, reject) => {
    fs.writeFile("", value, { flag: "w", encoding: "utf-8" }, function (err) {
      if (err) {
        console.log("文件写入失败");
      } else {
        console.log("文件写入成功");
      }
    });
  });
}
