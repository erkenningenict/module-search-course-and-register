export function parseLocationSearch(url: string): Array<{ key: string; value: string }> {
  const paramsSplitted = url
    .trim()
    .replace(/^[?]/, '')
    .split('&');
  return paramsSplitted.map((param) => {
    const paramSet = param.split('=');
    return { key: paramSet[0], value: paramSet[1] };
  });
}
