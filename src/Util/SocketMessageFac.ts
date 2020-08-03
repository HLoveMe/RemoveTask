

export const MessageFac = (data: any, key: number = 0): string => {
  try {
    const result = {
      data,
      date: (new Date().getTime()),
      key,
      computer: {}
    }
    return JSON.stringify(result)
  } catch (error) {
    return ""
  }
}