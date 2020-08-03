
declare type GoRequestFunction = (url: string) => Promise<any | null>

export const goRequestJson: GoRequestFunction = (url: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url)
      const result = await response.json();
      resolve(result);
    } catch (error) {
      resolve(null);
    }
  });
}