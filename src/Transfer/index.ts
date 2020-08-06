
import WebSocketManager from "./WebSocketManager";
/**
 * 服务器中转
 * 8080
 * 
 */

class AppServer{
  run(){
    WebSocketManager.start()
  }
}


new AppServer().run()

