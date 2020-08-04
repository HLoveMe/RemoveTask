import { Message, MessageType } from "../WebSocket/SocketMessage"


export const MessageFac = (msg: Message): string => {
  try {
    const result = {
      ...msg,
      date: (new Date().getTime()),
      computer: {}
    }
    return JSON.stringify(result)
  } catch (error) {
    return ""
  }
}

export const ErrorMsgFac = (msg: Message, info: any = "") => {
  return JSON.stringify({
    id: msg.id || 0,
    key: msg.key || MessageType.Normal,
    name: msg.name || "",
    error:info
  })
}