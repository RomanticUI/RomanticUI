import { HeadingLevel, IParagraphOptions, Paragraph } from 'docx';
import React, { Children, useEffect } from 'react';
import { Writable } from '../index.d';
import copyObjectValue from '../utils/copyObjectValue';
import isValidKey from '../utils/isValidKey';

enum headingType {
  TITLE,
  HEADING_1,
  HEADING_2,
  HEADING_3,
  HEADING_4,
  HEADING_5,
  HEADING_6,
}

export type RHeadingProps = Omit<IParagraphOptions, 'children'> & {
  children: React.ReactElement;
  level: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  disposition: Array<any>;
};

const RHeading = (props: RHeadingProps) => {
  let {
    level,
    disposition, // []
  } = props;

  let headingDisposition: Writable<IParagraphOptions> = {}; // 标题的配置

  useEffect(() => {
    disposition.push(new Paragraph(headingDisposition));
  }, []);

  // 处理标题等级
  let type = headingType[level];
  if (isValidKey(type, HeadingLevel)) {
    headingDisposition.heading = HeadingLevel[type];
  }

  copyObjectValue(headingDisposition, props, ['disposition', 'level', 'children']);

  // 如果只有一个子元素且是字符串类型，则直接放入text文件并返回null
  if (Children.count(props.children) === 1 && typeof props.children === 'string') {
    headingDisposition.text = props.children;
    return null;
  } else {
    headingDisposition.children = [];
    return Children.map(props.children, (child) => {
      return React.cloneElement(child, { disposition: headingDisposition.children });
    });
  }
};

export default RHeading;
