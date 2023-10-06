import { ISectionOptions } from 'docx';
import React, { Children } from 'react';
import copyObjectValue from '../utils/copyObjectValue';

export type RSectionProps = Omit<ISectionOptions, 'children'> & {
  children: React.ReactElement;
  disposition: ISectionOptions;
};

const RSection = (props: RSectionProps) => {
  let { disposition } = props; // {children:[]}
  // 合并section的配置
  copyObjectValue(disposition, props);
  // 创建子组件的配置
  let cns = Children.map(props.children, (child) => {
    return React.cloneElement(child, { disposition: disposition.children });
  });

  return cns;
};

export default RSection;
