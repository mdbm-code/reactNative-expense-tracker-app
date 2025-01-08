export function getPartString(string, separator, left) {
  const separatorIndex = string.indexOf(separator);
  if (separatorIndex === -1) {
    return string;
  }
  return string.slice(separatorIndex + 1);
}
