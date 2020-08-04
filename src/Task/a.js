var os = require("os");
const aa = require("child_process");
var child = aa.spawn("lssss", ["-a", "-l"])
child.on("close",(data)=>{
  console.log("close",data)
//结束
})
child.on("message",(data)=>{
  console.log("message",data)
})

child.on("error",(data)=>{
  //失败
  console.log("error111",data.toString())
})

child.on("exit",(data)=>{
  console.log("exit",data)
});

child.stderr.on("data",(data)=>{
  //输出错误日志
  console.log("stderr",data)
})
child.stdout.on('data', (data) => {
  //获得日志输出
  console.log("stdout",data)
});