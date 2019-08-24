/**
 * 一维对象数组转树
 * @param {Array} arr 一维对象数组, 如 [{id: 1,pid: 0,name: 'body'}, {id: 2,pid: 1,name: 'title'}]
 * @param {string} idName 用来表示节点的唯一id的属性的名称
 * @param {string} pidName 用来表示父节点的属性的名称
 */
export const arrayToTree = (arr,idName,pidName) => {
  let data = JSON.parse(JSON.stringify(arr))
  let result = []
  if (!Array.isArray(data)) {
    return result
  }
  data.forEach(item => {
    delete item.children;
  });
  let map = {};
  data.forEach(item => {
    map[item[idName]] = item;
  });
  data.forEach(item => {
    // 浅拷贝
    let parent = map[item[pidName]];
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      result.push(item);
    }
  });
  return result;
}