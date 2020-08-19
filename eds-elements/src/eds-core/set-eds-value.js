const getPathLeaf = function(path) {
  let obj = window.EDS;
  const parts = path.split('.');

  while (parts.length > 1) {
    const part = parts.shift();
    obj[part] = obj[part] || {};
    obj = obj[part];
  }

  return obj;
};

export function setEDSValue(path, value) {
  const parts = path.split('.');
  const obj = getPathLeaf(path);

  obj[parts.pop()] = value;
}

export function deleteEDSValue(path) {
  const parts = path.split('.');
  const obj = getPathLeaf(path.slice(0, -1));

  delete obj[parts.pop()];
}
