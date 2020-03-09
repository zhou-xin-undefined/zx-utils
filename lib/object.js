/**
 * 数组的深拷贝函数, 考虑循环引用
 * @param {Array} src
 * @param {Array} target
 */
export function cloneArr(src, target) {
  for (let item of src) {
    if (Array.isArray(item)) {
      target.push(cloneArr(item, []));
    } else if (typeof item === "object") {
      target.push(deepClone(item, {}));
    } else {
      target.push(item);
    }
  }
  return target;
}

/**
 * 对象的深拷贝实现, 考虑循环引用
 * @param {Object} src
 * @param {Object} target
 * @return {Object}
 */
export function deepClone(src, target) {
  const keys = Reflect.ownKeys(src);
  let value = null;
  for (let key of keys) {
    value = src[key];
    if (Array.isArray(value)) {
      target[key] = cloneArr(value, []);
    } else if (typeof value === "object") {
      // 如果是对象而且不是数组, 那么递归调用深拷贝
      target[key] = deepClone(value, {});
    } else {
      target[key] = value;
    }
  }

  return target;
}
