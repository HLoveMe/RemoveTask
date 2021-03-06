const path = require("path");
const fs = require("fs");
const remove_task_root = path.join(__dirname, "Tasks");
function scanFiles(entry) {
  if (!fs.existsSync(entry)) return [];
  const res = [];
  const dirInfo = fs.readdirSync(entry);
  dirInfo.forEach(item => {
    const location = path.join(entry, item)
    res.push(location);
  })
  return res;
}

const paths = scanFiles(remove_task_root).filter($1 => {
  const name = path.basename($1);
  if (name == "index.js") return false;
  if (name.startsWith(".")) return false;
  if (name.endsWith(".map")) return false;
  return true
});

const results = paths.map($1 => {
  const name = path.basename($1).split(".")[0]
  const context = fs.readFileSync($1);
  const base64 = Buffer.from(context).toString("base64");
  return {
    name: name,
    conetxt:base64
  }
})
/**
 * 编译后的js 文件保存在Task文件夹下
 */
console.log(
  JSON.stringify({
    id: 1234,
    key: 1000,//MessageType.TASK
    date: new Date().getTime(),
    name: "RemoteListenTask",
    data: results
  })
)
