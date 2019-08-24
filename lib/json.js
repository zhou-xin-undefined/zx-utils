// 递归遍历对象进行json格式化
export const diguiJson = (obj) => {
  if (typeof obj === 'string') {
    obj = JSON.parse(obj)
  }
  if (obj !== null && obj !== undefined && typeof obj === 'object') {
    let newObj = {};
    Object.keys(obj).map((k, i) => {
      let v = obj[k];
      if (typeof v === 'string') {
        try {
          v = JSON.parse(v);
        } catch (error) {
          v = v
        }
      }
      if (v !== null && v !== undefined && typeof v === 'object') {
        v = diguiJson(v);
      }
      newObj[k] = v;
    });
    return newObj;
  } else {
    return obj;
  }
}