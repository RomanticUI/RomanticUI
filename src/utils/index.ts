// 判断是否内容溢出
const judgeIsOverFlow = <T extends HTMLElement>(
  target: React.MutableRefObject<T>,
  direction: 'row' | 'col' = 'row',
) => {
  if (direction === 'row') {
    console.log(target.current.scrollWidth, target.current.clientWidth);
    return target.current.scrollWidth > target.current.clientWidth;
  } else {
    return target.current.scrollHeight > target.current.clientHeight;
  }
};

// 节流
function throttle(func: Function, delay: number) {
  let timeout: NodeJS.Timeout | null = null; //定义一个定时器标记
  return function (evnet: WheelEvent, ..._arguments: any) {
    evnet.preventDefault();
    // 判断是否存在定时器
    if (!timeout) {
      // 创建一个定时器
      timeout = setTimeout(() => {
        // delay时间间隔清空定时器
        timeout = null;
        func.call(this, evnet, ..._arguments);
      }, delay);
    }
  };
}
export { judgeIsOverFlow, throttle };
