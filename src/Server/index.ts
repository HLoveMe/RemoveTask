import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import WebSocketManager from "./WebSocketManager";
import { IndexController } from "./Controllers/IndexController";
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
    app.listen(9091)
    WebSocketManager.start();
  }
}


new AppServer().run()

