import React, { Component } from 'react';
import './style/index.module.less';
export interface ProgressBar {
  // prefixCls 为了以后样式统一设置的 classname

  prefixCls?: string;
  step?: number;
  total?: number;
  showInfo?: boolean;
  color?: string;
}

export interface IProgressProps {
  // prefixCls 为了以后样式统一设置的 classname

  prefixCls?: string;
  step?: number;
  total?: number;
  showInfo?: boolean;
  color?: string;
}

/**
 * @desc  处理 progressNumber
 */
const validProgress = (progress: number | undefined) => {
  //当你的参数定义了 number 等类型，你必须对 !progress 的时候处理，不然 ts 会提示你错误。
  if (!progress || progress < 0) {
    return 0;
  } else if (progress > 100) {
    return 100;
  }

  return progress;
};

/**
 * @desc 除法处理成0-100的整数
 * @param step
 * @param total
 */
const percentDeal = (step: number | undefined, total: number | undefined) => {
  if (!step || !total) {
    return 0;
  }

  return (step / total) * 100;
};

/**
 * @param text 百分比显示
 */
const parseIntPrecent = (text: number): string => `${Math.ceil(text)}%`;

class ProgressBar extends Component<IProgressProps> {
  /* ...
   ....defaultProps
   .....propTypes
   ......
  */
  render() {
    // 把需要的值先从 this.props 中取出来
    // restProps 扩充参数用
    const { prefixCls, step, total, showInfo, color, ...restProps } = this.props;

    /**
     * percent 百分比
     * text tip 显示文字
     * progressInfo 提示模块
     * porgress 主模块
     */
    let percent;
    let text;
    let progressInfo;
    let progress;

    percent = percentDeal(step, total);
    console.log('percent', percent);
    // percent: 20

    text = parseIntPrecent(validProgress(percent));
    console.log('text', text);
    // text: 20%

    if (showInfo) {
      progressInfo = (
        <div className={`${prefixCls}-show-info`}>
          <span className={`${prefixCls}-text`}>{text}</span>
        </div>
      );
    }

    // color defalutProps 定义默认的颜色
    // 前面&-bg 设置 relative 定位
    const fixBgStyle = {
      width: text,
      height: '12px',
      background: color,
      borderRadius: '100px',
    };

    progress = (
      <div>
        <div className={`${prefixCls}-outer`}>
          <div className={`${prefixCls}-inner`}>
            <div className={`${prefixCls}-bg`} style={fixBgStyle}>
              {progressInfo || null}
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div {...restProps} className="tiger-progress">
        {progress}
      </div>
    );
  }
}
export default ProgressBar;
