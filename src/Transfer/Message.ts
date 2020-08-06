import { MessageType, Message } from "../WebSocket/SocketMessage"
import { FileInfo } from "../Util/FileUtil";


export declare interface ExecFileData extends FileInfo {
  status: Boolean;
}
export declare interface ExecFileUpMessage extends Message {
  data: ExecFileData
}