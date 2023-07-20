import { IParagraphOptions, Paragraph } from 'docx';
import React, { Children, useEffect } from 'react';
import { Writable } from '../index.d';
import copyObjectValue from '../utils/copyObjectValue';

export type RParagraphProps = Omit<IParagraphOptions, 'children'> & {
  children: React.ReactElement;
  disposition: Array<any>;
};

const RParagraph = (props: RParagraphProps) => {
  let {
    disposition, // []
  } = props;

  let paragrahDisposition: Writable<IParagraphOptions> = {};

  useEffect(() => {
    disposition.push(new Paragraph(paragrahDisposition));
  }, []);

  copyObjectValue(paragrahDisposition, props);

  // 如果只有一个子元素且是字符串类型，则直接放入text文件并返回null
  if (Children.count(props.children) === 1 && typeof props.children === 'string') {
    paragrahDisposition.text = props.children;
    return null;
  } else {
    paragrahDisposition.children = [];
    return Children.map(props.children, (child) => {
      return React.cloneElement(child, { disposition: paragrahDisposition.children });
    });
  }
};

export default RParagraph;
