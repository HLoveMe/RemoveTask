import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import WebSocketManager from "./WebSocketManager";
import Config from "../Config";
/**
 * 服务器中转
 * 8080
 * 
 */

class AppServer {
  run() {
    const app = createExpressServer({
      controllers: [
        __dirname + "/Controllers/*.js",
      ] //声明需要使用的控制器
    });
    app.listen(Config.server_ip);
    WebSocketManager.start();
  }
}


new AppServer().run()

