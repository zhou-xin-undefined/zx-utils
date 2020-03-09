// import {
//   addSeparator
// } from './index';
const util = require('./index');
console.log(util.addSeparator(1000000000.000000));
// 测试代码
// 这个对象a是一个囊括以上所有情况的对象
let a = {
  age: 1,
  jobs: {
    first: "FE"
  },
  schools: [{
      name: "shenda"
    },
    {
      name: "shiyan"
    }
  ],
  arr: [
    [{
      value: "1"
    }],
    [{
      value: "2"
    }]
  ]
};

let b = {};
util.deepClone(a, b);

a.jobs.first = "native";
a.schools[0].name = "SZU";
a.arr[0][0].value = "100";

console.log(a.jobs.first, b.jobs.first); // output: native FE
console.log(a.schools[0], b.schools[0]); // output: { name: 'SZU' } { name: 'shenda' }
console.log(a.arr[0][0].value, b.arr[0][0].value); // output: 100 1
console.log(Array.isArray(a.arr[0])); // output: true

// 以下是测试代码
function test(arg1, arg2) {
  console.log(arg1, arg2);
  console.log(this.a, this.b);
}
test.call2({
    a: "a",
    b: "b",
    fn: function () {
      console.log(1111)
    }
  },
  1,
  2
);
/**
 * 以下是测试代码
 */
test.apply2({
    a: "a",
    b: "b"
  },
  [1, 2]
);
/**
 * 以下是测试代码
 */
const test2 = test.bind2({
    a: "a",
    b: "b"
  },
  1
); // 参数 1
test2(2); // 参数 2