const path = require("path");
const fs = require("fs");
/**
 * 1:远程任务必须 使用 export.default
 * 2:远程任务文件保存位置位于TasK/Remote 下
 */
const remove_task_root = path.join(__dirname,"Tasks");
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

const paths = scanFiles(remove_task_root).filter($1=>{
  const name = path.basename($1);
  if(name == "index.js")return false;
  if(name.startsWith("."))return false;
  if(name.endsWith(".map"))return false;
  return true
});

const results = paths.map($1=>{
  const context = fs.readFileSync($1);
  const base64 = Buffer.from(context).toString("base64");
  return {
    name:"__NAME__",
    base64
  }
})
console.log(results)
// console.log("111",results.map($1=>Buffer.from($1.base64,"base64").toString("ascii")));
// fs.readFileSync()