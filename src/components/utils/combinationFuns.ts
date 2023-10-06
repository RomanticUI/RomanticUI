/**
 * 创建组合函数
 * @param fns 函数数组
 * @returns
 */
const combinationFuns = function (fns: Function[]) {
  const length: number = fns.length;

  return function (...args: any[]) {
    let index: number = 0;
    let result = length === 0 ? args : fns[index].apply(this, args);

    while (++index < length) {
      result = fns[index].call(this, result);
    }

    return result;
  };
};

export default combinationFuns;
