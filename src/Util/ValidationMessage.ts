
export const ValidationMessage = (data: any) => {
  if (data == null) return false;
  if (data["date"] == null) return false;
  if (data["name"] == null) return false;
  if (data["id"] == null) return false;
  return true;
}