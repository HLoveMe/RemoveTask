import { MessageType, Message } from "../WebSocket/SocketMessage"

//服务器 发送客服机表明Exec 连接中断
export const CloseMessage = (info: String): Message => { return { id: MessageType.ExecCLOSE, date: new Date().getTime(), key: MessageType.ExecCLOSE, data: { desc: "ExecClientClose", info } } }

export const PingMessage = { id: MessageType.PING, key: MessageType.PING, data: "ping" } as Message;
export const UuidMessage = { id: MessageType.UUID, key: MessageType.UUID, data: { uuid: "" } } as Message;