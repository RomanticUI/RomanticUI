import classNames from 'classnames';
import React, { useCallback, useEffect, useRef } from 'react';
import { getPixelRatio, reRendering, rotateWatermark } from '../utils';
import './style/index.module.less';

const BaseSize = 2;
const FontGap = 3;

export interface WaterMarkProps {
  zIndex?: number;
  rotate?: number;
  width?: number;
  height?: number;
  image?: string;
  content?: string | string[];
  font?: {
    color?: string;
    fontSize?: number | string;
    fontWeight?: 'normal' | 'light' | 'weight' | number;
    fontStyle?: 'none' | 'normal' | 'italic' | 'oblique';
    fontFamily?: string;
  };
  style?: React.CSSProperties;
  className?: string;
  rootClassName?: string;
  gap?: [number, number];
  offset?: [number, number];
  children?: React.ReactNode;
}

const Watermark: React.FC<WaterMarkProps> = (props) => {
  const {
    zIndex = 9,
    rotate = -22,
    width,
    height,
    image,
    content,
    font = {},
    style,
    className,
    rootClassName,
    gap = [100, 100],
    offset,
    children,
  } = props;

  const {
    color = 'rgba(0,0,0,.15)',
    fontSize = 16,
    fontWeight = 'normal',
    fontStyle = 'normal',
    fontFamily = 'sans-serif',
  } = font;

  const [gapX, gapY] = gap;
  const gapXCenter = gapX / 2;
  const gapYCenter = gapY / 2;
  //水平距离容器左上角的偏移量，默认是gap/2
  const offsetLeft = offset?.[0] ?? gapXCenter;
  const offsetTop = offset?.[1] ?? gapYCenter;

  const getMarkStyle = () => {
    const markStyle: React.CSSProperties = {
      zIndex,
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      backgroundRepeat: 'repeat',
    };

    let positionLeft = offsetLeft - gapXCenter;
    let positionTop = offsetTop - gapYCenter;
    if (positionLeft > 0) {
      markStyle.left = `${positionLeft}px`;
      markStyle.width = `calc(100% - ${positionLeft}px)`;
      positionLeft = 0;
    }
    if (positionTop > 0) {
      markStyle.top = `${positionTop}px`;
      markStyle.height = `calc(100% - ${positionTop}px)`;
      positionTop = 0;
    }
    markStyle.backgroundPosition = `${positionLeft}px ${positionTop}px`;

    return markStyle;
  };

  // 添加水印
  const appendWatermark = (base64Url: string, markWidth: number) => {
    if (containerRef.current && watermarkRef.current) {
      const toLowercaseSeparator = (key: string) =>
        key.replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`);

      stopObservation.current = true; // 添加的时候不观察

      requestAnimationFrame(() => {
        if (watermarkRef.current && containerRef.current) {
          const style: React.CSSProperties = {
            ...getMarkStyle(),
            backgroundImage: `url('${base64Url}')`,
            backgroundSize: `${(gapX + markWidth) * BaseSize}px`,
          };
          //将对象变为字符串
          const styleStr = Object.keys(style)
            .map((key: keyof React.CSSProperties) => `${toLowercaseSeparator(key)}: ${style[key]};`)
            .join(' ');

          watermarkRef.current.setAttribute('style', styleStr);

          containerRef.current.append(watermarkRef.current);
        }

        setTimeout(() => {
          stopObservation.current = false;
        });
      });
    }
  };

  const getMarkSize = (ctx: CanvasRenderingContext2D) => {
    let defaultWidth = 120;
    let defaultHeight = 64;
    if (!image && ctx.measureText) {
      ctx.font = `${Number(fontSize)}px ${fontFamily}`;
      const contents = Array.isArray(content) ? content : [content];
      const widths = contents.map((item) => ctx.measureText(item!).width);
      //最多文字的width Math。max（）
      defaultWidth = Math.ceil(Math.max(...widths));
      defaultHeight = Number(fontSize) * contents.length + (contents.length - 1) * FontGap;
    }
    //看是否有width否则默认
    return [width ?? defaultWidth, height ?? defaultHeight] as const;
  };

  //绘制文字
  const fillTexts = (
    ctx: CanvasRenderingContext2D,
    drawX: number,
    drawY: number,
    drawWidth: number,
    drawHeight: number,
  ) => {
    const ratio = getPixelRatio();
    const mergedFontSize = Number(fontSize) * ratio;
    //设置文本属性
    ctx.font = `${fontStyle} normal ${fontWeight} ${mergedFontSize}px/${drawHeight}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    //画布的平行移动
    ctx.translate(drawWidth / 2, 0);
    const contents = Array.isArray(content) ? content : [content];
    //画画
    contents?.forEach((item, index) => {
      //判断类型
      ctx.fillText(item ?? '', drawX, drawY + index * (mergedFontSize + FontGap * ratio));
    });
  };

  const drawText = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    drawX: number,
    drawY: number,
    drawWidth: number,
    drawHeight: number,
    alternateRotateX: number,
    alternateRotateY: number,
    alternateDrawX: number,
    alternateDrawY: number,
    markWidth: number,
  ) => {
    fillTexts(ctx, drawX, drawY, drawWidth, drawHeight);
    ctx.restore();
    rotateWatermark(ctx, alternateRotateX, alternateRotateY, rotate);
    fillTexts(ctx, alternateDrawX, alternateDrawY, drawWidth, drawHeight);
    appendWatermark(canvas.toDataURL(), markWidth);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>();
  const stopObservation = useRef(false);

  //在containerRef中插入一个元素
  const renderWatermark = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (ctx) {
      if (!watermarkRef.current) {
        //创建一个div对象
        watermarkRef.current = document.createElement('div');
      }
      //获取像素比
      const ratio = getPixelRatio();
      //获取mark的大小，img的默认值为120*64，content是自身内容的宽高
      const [markWidth, markHeight] = getMarkSize(ctx);
      //设置画布大小  gpx水印之间的间距
      const canvasWidth = (gapX + markWidth) * ratio;
      const canvasHeight = (gapY + markHeight) * ratio;
      //baseSize = 2
      canvas.setAttribute('width', `${canvasWidth * BaseSize}px`);
      canvas.setAttribute('height', `${canvasHeight * BaseSize}px`);
      //绘制属性
      const drawX = (gapX * ratio) / 2; //从哪里开始画画
      const drawY = (gapY * ratio) / 2;
      const drawWidth = markWidth * ratio; //画的宽高
      const drawHeight = markHeight * ratio;
      //开始旋转
      const rotateX = (drawWidth + gapX * ratio) / 2; //移动的位置
      const rotateY = (drawHeight + gapY * ratio) / 2; //
      const alternateDrawX = drawX + canvasWidth;
      const alternateDrawY = drawY + canvasHeight;
      const alternateRotateX = rotateX + canvasWidth;
      const alternateRotateY = rotateY + canvasHeight;

      //保存
      ctx.save();
      //ctx。rotate，先移动再旋转再移动回来
      rotateWatermark(ctx, rotateX, rotateY, rotate);

      if (image) {
        const img = new Image();
        img.onload = () => {
          //img和text的处理
          ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
          ctx.restore();
          rotateWatermark(ctx, alternateRotateX, alternateRotateY, rotate);
          ctx.drawImage(img, alternateDrawX, alternateDrawY, drawWidth, drawHeight);
          appendWatermark(canvas.toDataURL(), markWidth);
        };
        img.onerror = () =>
          drawText(
            canvas,
            ctx,
            drawX,
            drawY,
            drawWidth,
            drawHeight,
            alternateRotateX,
            alternateRotateY,
            alternateDrawX,
            alternateDrawY,
            markWidth,
          );
        img.crossOrigin = 'anonymous';
        img.referrerPolicy = 'no-referrer';
        img.src = image;
      } else {
        drawText(
          canvas,
          ctx,
          drawX,
          drawY,
          drawWidth,
          drawHeight,
          alternateRotateX,
          alternateRotateY,
          alternateDrawX,
          alternateDrawY,
          markWidth,
        );
      }
    }
  };

  // 渲染水印
  useEffect(renderWatermark, [
    rotate,
    zIndex,
    width,
    height,
    image,
    content,
    color,
    fontSize,
    fontWeight,
    fontStyle,
    fontFamily,
    gapX,
    gapY,
    offsetLeft,
    offsetTop,
  ]);

  const destroyWatermark = () => {
    if (watermarkRef.current) {
      watermarkRef.current.remove();
      watermarkRef.current = undefined;
    }
  };

  const onMutate = useCallback(
    async (mutations: MutationRecord[]) => {
      if (stopObservation.current) {
        return;
      }
      let needRender = false;

      for (const mutation of mutations) {
        if (reRendering(mutation, watermarkRef.current)) {
          needRender = true;
          break; // 直接跳出循环
        }
      }

      if (needRender) {
        destroyWatermark();
        await new Promise((resolve) => requestAnimationFrame(resolve)); // 等待下一次绘制帧之前进行重新渲染
        renderWatermark();
      }
    },
    [destroyWatermark, renderWatermark, reRendering],
  );

  const callback = useCallback(onMutate, []);

  //检测dom变化
  useEffect(() => {
    let instance: MutationObserver;
    const currentElement = containerRef?.current;
    if (currentElement) {
      instance = new MutationObserver(callback);
      instance.observe(currentElement, {
        subtree: true,
        childList: true,
        attributeFilter: ['style', 'class'],
      });
    }
    return () => {
      instance?.takeRecords();
      instance?.disconnect();
    };
  }, [containerRef]);

  return (
    <div
      ref={containerRef}
      className={classNames(className, rootClassName)}
      style={{ position: 'relative', ...style }}
    >
      {children}
    </div>
  );
};

export default Watermark;
