export const addSeparator = (str = '', sep = ',') => {
  str += '';
  const arr = str.split('.'),
    reg = /(?=((?!\b)\d{3})+$)/g
  let integer = arr[0],
    decimal = arr.length <= 1 ? '' : `.${arr[1]}`;
  integer = integer.replace(reg, sep);
  return integer + decimal;
}
