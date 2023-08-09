import React, { CSSProperties, useEffect, useState } from 'react';
import './style/index.less';

export interface SvgIconProps {
  nodeAttribute?: {
    width?: string;
    height?: string;
    fill?: string;
    [k: string]: any;
  };
  style?: CSSProperties;
  svgName?: string; // 如果path未传入，默认是public，可以根据文件名直接查找
}

const SvgIcon: React.FC<SvgIconProps> = (props) => {
  let { svgName, nodeAttribute, style } = props;

  const [Icon, setIcon] = useState<React.ReactElement>();
  useEffect(() => {
    if (svgName) {
      import(`${svgName}.svg`).then((module) => {
        let Temp = module.ReactComponent as React.ReactElement;
        setIcon(Temp);
      });
    }
  }, []);

  return <>{Icon && React.cloneElement(Icon, { ...nodeAttribute, style })}</>;
};

export default SvgIcon;
