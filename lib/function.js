/**
 * 实现call
 * 关键：如果一个函数作为一个对象的属性，那么通过对象的.运算符调用此函数，this就是此对象
 */
Function.prototype.call2 = function (context) {
  // 如果调用call2方法的对象不是一个function,就报类型错误
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  // 默认上下文是window
  context = context || window;
  // 指定当前作用域的将要执行的方法,使用symbol保持唯一性.
  const fn = Symbol('fn');
  context[fn] = this;
  // 获取call2方法传入的参数,逗号隔开形式,解构成数组然后去掉表示作用域的第一个参数
  const args = [...arguments].slice(1);
  // 调用传入作用域的方法,传入逗号隔开的参数
  const result = context[fn](...args);
  // 删除新增的方法,还原作用域对象
  delete context[fn];
  return result;
};
/**
 * 实现apply,与call类似,只是传入的参数形式是数组形式，而不是逗号分隔的参数序列。
 */
Function.prototype.apply2 = function (context) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  context = context || window;
  const fn = Symbol('fn');
  context[fn] = this;
  let result;
  if (Array.isArray(arguments[1])) {
    // 通过...运算符将数组转换为用逗号分隔的参数序列
    result = context[fn](...arguments[1]);
  } else {
    result = context[fn]();
  }
  delete context[fn];
  return result;
};
/**
 * 实现 bind
 * 本身返回一个新的函数，所以要考虑new的情况
 * 可以“保留”参数，内部实现了参数的拼接
 */
Function.prototype.bind2 = function (context) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  const that = this;
  // 保留之前的参数，为了下面的参数拼接
  const args = [...arguments].slice(1);
  return function F() {
    // 如果被new创建实例，不会被改变上下文！
    if (this instanceof F) {
      return new that(...args, ...arguments);
    }
    // args.concat(...arguments): 拼接之前和现在的参数
    // 注意：arguments是个类Array的Object, 用解构运算符..., 直接拿值拼接
    return that.apply(context, args.concat(...arguments));
  };
};
