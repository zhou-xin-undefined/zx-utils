// 返回字符串中第一个只出现过一次的字符
export const find_ch1 = str => {
  for (let ch of str) {
      console.log(ch)
    if (str.indexOf(ch) === str.lastIndexOf(ch)) {
      return ch;
    }
  }
};
// 输出答案是 l
console.log(find_ch("google"));