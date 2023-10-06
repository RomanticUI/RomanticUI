import React from 'react';
import './style/index.less';
import classNames from 'classnames';

interface SpinProps {
  type: string,
  style?: React.CSSProperties;
  className?: string;
};

const Spin: React.FC<SpinProps> = (props) => {
  const { type, className, style } = props;
  const prefixCls = 'romantic-spin';

  return (
    <div
      className={classNames(`${className}`, `${prefixCls}`, {
        [`${prefixCls}-${type}`]: type
      })}
      style={style}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spin;
