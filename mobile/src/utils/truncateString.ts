export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  }

  const truncatedStr = str.slice(0, maxLength - 3) + "...";
  return truncatedStr;
}
