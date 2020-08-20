# RemoveTask


* 启动tsc 编译
* client_build 编译客户端
* server 启动服务器
* exec_client 启动执行端
* 打开./dist/Client/index.html 连接远程



* Serve

  * upload   Client==>ExecClient====>Serve  UploadFileTask 上传文件
  * download  Client ===>Serve 下载文件  http://1991919:8081/file/download?name=xx.txt
  * files 查看所有可下载文件 http://1991919:8081/project/files
  * config  Client 指定 ExecClient 更新配置  ConfigCheckTask

