import Config from "../Config/index";
export const ValidationMessage = (data: any) => {
  if (data == null) return false;
  if (data["date"] == null) return false;
  if (data["id"] == null) return false;
  if (data["key"] == null) return false;
  return true;
}

export const ValidationConfig = (data: Object) => {
  const target = Object.keys(data);
  const source = Object.keys(Config);
  return source.every($1 => target.indexOf($1) >= 0);
}