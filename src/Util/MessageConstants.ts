import { MessageType, Message, PingInfoMessage } from "../WebSocket/SocketMessage"
import { getComInfo } from "./Machine";
const getmac = (globalThis || window || this).navigator != null ? () => { } : require("getmac").default
export const mac_id = getmac();

//服务器 发送客服机表明Exec 连接中断
export const CloseMessage = (info: String): Message => { return { id: MessageType.ExecCLOSE, date: new Date().getTime(), key: MessageType.ExecCLOSE, data: { desc: "ExecClientClose", info, uuid: null } } }

export const ClearMessage = { id: MessageType.CLEAR, key: MessageType.CLEAR, data: {} } as Message;

export const PingMessage = { id: MessageType.PING, key: MessageType.PING, data: { ping: "ping", compute: getComInfo(), uuid: mac_id } } as any as PingInfoMessage;

export const UuidMessage = { id: MessageType.UUID, key: MessageType.UUID, data: { uuid: mac_id } } as Message;

export const RequestUuidMessage = { id: MessageType.REQUEST_UUID, key: MessageType.REQUEST_UUID, get date() { return new Date().getTime() } } as Message;

export const TaskNameMessage = { id: MessageType.INFO_KEY, key: MessageType.INFO_KEY, data: { task_info: null, task_names: null, message_types: Object.keys(MessageType), uuid: mac_id } } as Message;

//客户端 请求连接Exec
export const LineMessage = (uuid: String) => { return { id: MessageType.LINK, key: MessageType.LINK, data: { uuid: uuid } } as Message };