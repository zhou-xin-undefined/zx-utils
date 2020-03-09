// 返回字符串中第一个只出现过一次的字符
export const firstOnlyOne = str => {
  for (let ch of str) {
    if (str.indexOf(ch) === str.lastIndexOf(ch)) {
      return ch;
    }
  }
};