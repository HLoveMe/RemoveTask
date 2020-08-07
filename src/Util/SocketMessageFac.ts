import { Message, MessageType, ErrorInfoMessage } from "../WebSocket/SocketMessage"
import { mac_id } from "./MessageConstants"



export const MessageFac = (msg: Message, noUpdate: boolean = false): string => {
  try {
    const result = {
      ...msg,
      date: noUpdate ? msg.date : (new Date().getTime())
    }
    return JSON.stringify(result)
  } catch (error) {
    return ""
  }
}

export const ErrorMsgFac = (msg: ErrorInfoMessage, info: any = "", uuid: string = null) => {
  return JSON.stringify({
    id: msg.id || MessageType.ERROR,
    key: msg.key || MessageType.ERROR,
    name: msg.name || "",
    date: new Date().getTime(),
    data: {
      error: info,
      uuid: uuid ?? mac_id
    }
  })
}
