import { IRunOptions, TextRun } from 'docx';
import { Children, useEffect } from 'react';
import { Writable } from '../index.d';
import copyObjectValue from '../utils/copyObjectValue';

export type RTextProps = Omit<IRunOptions, 'children'> & {
  children: React.ReactElement;
  disposition: Array<any>;
};

const RText = (props: RTextProps) => {
  let { disposition } = props;

  let textDisposition: Writable<IRunOptions> = {}; // 文字

  useEffect(() => {
    disposition.push(new TextRun(textDisposition));
  }, []);

  copyObjectValue(textDisposition, props);

  // 如果只有一个子元素且是字符串类型，则直接放入text文件并返回null
  if (Children.count(props.children) === 1 && typeof props.children === 'string') {
    textDisposition.text = props.children;
    return null;
  }

  return null;
};

export default RText;
