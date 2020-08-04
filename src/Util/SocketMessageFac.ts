import { Message, MessageType } from "../WebSocket/SocketMessage"


export const MessageFac = (msg: Message): string => {
  try {
    const result = {
      ...msg,
      date: (new Date().getTime())
    }
    return JSON.stringify(result)
  } catch (error) {
    return ""
  }
}

export const ErrorMsgFac = (msg: Message, info: any = "") => {
  return JSON.stringify({
    id: msg.id || MessageType.ERROR,
    key: msg.key || MessageType.ERROR,
    name: msg.name || "",
    error: info
  })
}