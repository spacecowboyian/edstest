export function uniqueId() {
  // Credit: https://gist.github.com/gordonbrander/2230317
  return '_' + Math.random().toString(36).substr(2, 9);
}
