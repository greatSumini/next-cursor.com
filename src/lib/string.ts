export function isEmptyStringOrNil(str: string | null | undefined) {
  return str == null || (typeof str === "string" && str.trim() === "");
}
