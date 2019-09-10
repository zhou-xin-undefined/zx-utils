/**
 * 正则表达式判断
 */
/**
 * 手机号正则
 */
export const regPhone = /^((13[0-9])|(14[579])|(15([0-3]|[5-9]))|(16[6])|(17[0135678])|(18[0-9])|(19[89]))\d{8}$/;
/**
 * 身份证正则
 */
export const regIdCard = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
/**
 * 验证手机号码格式
 * @param {String} phone 待验证的手机号码
 * @returns {Boolean}
 */
export const isPhone = (phone) => {
  return regPhone.test(phone);
}
/**
 * 验证身份证号码格式
 * @param {String} idCard 待验证的身份证号码
 * @returns {Boolean}
 */
export const isIdCard = (idCard) => {
  let reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
  return reg.test(idCard);
}