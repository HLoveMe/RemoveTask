# RemoveTask


* 启动tsc 编译
* client_build 编译客户端
* server 启动服务器 npm run run_linux_server
* exec_client 启动执行端 npm run run_mac_exec_client
* 打开./dist/Client/index.html 连接远程
* mac执行端 编译 打包 运行命令 run_mac_exec_client
* linux中转服务端 编译 打包 运行 run_linux_server

* 全局安装pm2  pm2启动 Execlient
* 设置开机自启动pm2

* Serve

  * upload   Client==>ExecClient====>Serve  UploadFileTask 上传文件
  * download  Client ===>Serve 下载文件  http://1991919:8081/file/download?name=xx.txt
  * files 查看所有可下载文件 http://1991919:8081/project/files
  * config  Client 指定 ExecClient 更新配置  ConfigCheckTask
  * /project/clear_connect  清空所有连接

* 安装依赖
  * nodejs python3 pm2 pyaudio opencv-python
  * py pyaudio 见 AudioListenTask.ts

* 开机启动程序 
 * window  https://www.cnblogs.com/rgcLOVEyaya/p/RGC_LOVE_YAYA_1075_days.html  【Exec 程序 和 photo serve程序】