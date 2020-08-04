var P = require("child_process");

const child = P.spawn("sudo",[]);
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
  console.log("stderr",data.toString())
})
child.stdout.on('data', (data) => {
  //获得日志输出
  console.log("stdout",data.toString())
});
