

export const MessageFac = (data: any): string => {
  try {
    const result = {
      ...(data || {}),
      date: new Date(),
      computer: {}
    }
    return JSON.stringify(result)
  } catch (error) {
    return ""
  }
}