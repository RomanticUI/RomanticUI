import React, { Component } from 'react';
import './style/index.less';

export interface DividerProps {
  prefixCls?: string;
  content?: string;
  roClass?: string;
  textStyle?: object;
  dashed?: boolean;
}

class Divide extends Component<DividerProps> {
  state = {};

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    const { prefixCls, content, roClass, dashed, ...restProps } = this.props;
    let divider;
    const lineStyle = {
      class1: dashed === true ? 'ro-divider-outer-dashed' : 'ro-divider-outer-undashed',
    };
    console.log(lineStyle.class1, 'dashed');
    // eslint-disable-next-line prefer-const
    divider = (
      <div className={`ro-divider-outer`}>
        <div className={`ro-divider-line ${lineStyle.class1}`}></div>
        {content ? <div className="ro-divider-content">{content}</div> : ''}
      </div>
    );

    return (
      <div {...restProps} className="ro-divider">
        {' '}
        {divider}
      </div>
    );
  }
}

export default Divide;
