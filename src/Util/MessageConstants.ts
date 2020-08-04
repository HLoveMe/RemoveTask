import { MessageType, Message } from "../WebSocket/SocketMessage"
const getmac = require("getmac").default
export const mac_id = getmac();

//服务器 发送客服机表明Exec 连接中断
export const CloseMessage = (info: String): Message => { return { id: MessageType.ExecCLOSE, date: new Date().getTime(), key: MessageType.ExecCLOSE, data: { desc: "ExecClientClose", info } } }

export const PingMessage = { id: MessageType.PING, key: MessageType.PING, data: { ping: "ping" } } as Message;

export const UuidMessage = { id: MessageType.UUID, key: MessageType.UUID, data: { uuid: mac_id } } as Message;

//客户端 请求连接Exec
export const LineMessage = (uuid: String) => { return { id: MessageType.LINK, key: MessageType.LINK, data: { uuid: uuid } } as Message };