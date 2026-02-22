Object.defineProperty(exports, Symbol.toStringTag, {
  value: 'Module'
});

//#region src/delve.ts
var STRICT_MODE = {};
var NOT_EXIST_MESSAGE = "Keypath is not exist";
function delve(obj, keypath, defaultValue) {
  if (obj == null) {
    if (defaultValue === STRICT_MODE) throw Error(NOT_EXIST_MESSAGE);
    return defaultValue;
  }
  var value = obj;
  if (Array.isArray(keypath)) {
    for (var i = 0, l = keypath.length; i < l; i++) {
      value = value[keypath[i]];
      if (value == null) {
        if (i == l - 1) return value;
        if (defaultValue === STRICT_MODE) throw Error(NOT_EXIST_MESSAGE);
        return defaultValue;
      }
    }
    return value;
  }
  for (var index = 0;;) {
    var index2 = keypath.indexOf(".", index);
    if (index2 == -1) return value[keypath.slice(index)];
    value = value[keypath.slice(index, index2)];
    if (value == null) {
      if (defaultValue === STRICT_MODE) throw Error(NOT_EXIST_MESSAGE);
      return defaultValue;
    }
    index = index2 + 1;
  }
}
function strictDelve(obj, keypath) {
  return delve(obj, keypath, STRICT_MODE);
}

//#endregion
exports.delve = delve;
exports.strictDelve = strictDelve;