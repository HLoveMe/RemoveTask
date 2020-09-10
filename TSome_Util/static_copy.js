const { existsSync, createReadStream, createWriteStream, unlinkSync, mkdirSync } = require('fs');
var os = require("os");
const isWindow = os.type() == "Windows_NT";
const path = require('path');
const transform = (url) =>
  isWindow ? url.split("/").join(path.sep) : url;

const copyfiles = [
  "Task/ListenerTask/pys/Audio.py",
  "Task/ListenerTask/pys/Photo.py",
  "Util/Py/takePhotoServer.py",
  "Client/index.html",
];

const src = path.join(__dirname, "..", "src");
const dist = path.join(__dirname, "..", "dist");
copyfiles.map($1 => transform($1)).forEach($1 => {
  const _dst = path.join(dist, $1);
  const _src = path.join(src, $1);
  // console.log(_dst, _src)
  if (existsSync(_dst)) unlinkSync(_dst);
  if (!existsSync(path.dirname(_dst))) mkdirSync(path.dirname(_dst))
  if (existsSync(_src)) {
    // console.log(111111)
    const readable = createReadStream(_src);
    const writable = createWriteStream(_dst);
    readable.pipe(writable);
  }
})
