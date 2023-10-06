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
function rotateWatermark(
  ctx: CanvasRenderingContext2D,
  rotateX: number,
  rotateY: number,
  rotate: number,
) {
  //中心为原点
  ctx.translate(rotateX, rotateY);
  ctx.rotate((Math.PI / 180) * Number(rotate));
  ctx.translate(-rotateX, -rotateY);
}
function getPixelRatio() {
  return window.devicePixelRatio || 1;
}
const reRendering = (mutation: MutationRecord, watermarkElement?: HTMLElement) => {
  let flag = false;
  if (mutation.removedNodes.length) {
    flag = Array.from(mutation.removedNodes).some((node) => node === watermarkElement);
  }
  if (mutation.type === 'attributes' && mutation.target === watermarkElement) {
    flag = true;
  }
  return flag;
};

export { judgeIsOverFlow, throttle, reRendering, getPixelRatio, rotateWatermark };
