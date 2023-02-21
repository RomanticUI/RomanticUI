import React, { Component } from 'react';
import './style/index.module.less';

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
     * text  显示文字
     * progressInfo 提示模块
     * porgress 主模块
     */
    let percent;
    let text;
    let progressInfo;
    let progress;

    percent = percentDeal(step, total);

    text = parseIntPrecent(validProgress(percent));
    console.log('text', text);

    // color defalutProps 定义默认的颜色
    // 前面&-bg 设置 relative 定位
    const fixBgStyle = {
      width: text,
      height: '12px',
      background: color,
      borderRadius: '100px',
    };

    const textStyle = {
      display: 'inline-block',
      width: '2em',
      marginLeft: '8px',
      fontSize: '1em',
      lineHeight: 3,
      whiteSpace: 'nowrap',
      textAlign: 'left',
      verticalAlign: 'middle',
      wordBreak: 'normal',
    };

    const innerStyle = {
      position: 'relative',
      display: 'inline-block',
      width: '100%',
      verticalAlign: 'middle',
      background: '#C0C0C0',
      borderRadius: '100px',
    };

    const outnerStyle = {
      display: 'inline-block',
      width: '100%',
      marginTop: '30px',
      marginRight: 0,
      paddingRight: 0,
    };
    if (showInfo) {
      progressInfo = (
        <div>
          <span style={textStyle}>{text}</span>
        </div>
      );
    }

    progress = (
      <div>
        <div style={outnerStyle}>
          <div style={innerStyle}>
            <div style={fixBgStyle}>{progressInfo || null}</div>
          </div>
        </div>
      </div>
    );

    return <div {...restProps}>{progress}</div>;
  }
}
export default ProgressBar;
