import React, { useEffect } from 'react';
import './style/index.less';

type Props = {
  style?: React.CSSProperties;
  className?: string;
};

const Spin: React.FC<Props> = (props, ref) => {
  const { className, ...rest } = props;
  useEffect(() => {}, []);
  return (
    <div {...rest} className={className}>
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
