const { existsSync, createReadStream, createWriteStream, unlinkSync } = require('fs');
var os = require("os");
const isWindow = os.type() == "Windows_NT";
const path = require('path');
const transform = (url) =>
  isWindow ? url.split("/").join(path.sep) : url;

const copyfiles = [
  "Task/ListenerTask/Audio.py",
  "Client/index.html"
];

const src = path.join(__dirname, "..", "src");
const dist = path.join(__dirname, "..", "dist");
copyfiles.map($1 => transform($1)).forEach($1 => {
  const _dst = path.join(dist, $1);
  const _src = path.join(src, $1);
  if (existsSync(_dst)) unlinkSync(_dst);
  if (existsSync(_src)) {
    const readable = createReadStream(_src);
    const writable = createWriteStream(_dst);
    readable.pipe(writable);
  }
})
