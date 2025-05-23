export function encodeQuery(query: object) {
  const json = JSON.stringify(query);
  return encodeURIComponent(btoa(json));
}

export function decodeQuery(query: string): object {
  const json = atob(decodeURIComponent(query));
  return JSON.parse(json);
}
