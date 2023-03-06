// 引入测试组件
import React from 'react';
import Tabs from '..';
// 使用@testing-library/react渲染对应组件
import { render } from '@testing-library/react';

// 测试用例编写，此为伪代码
describe('Tabs Test', () => {
  // it('', ...)第一个参数字符串内描述测试用例，请用英文描述准确、清晰
  it('test case1 for basic', () => {
    const items = [
      {
        key: '1',
        label: `Tab 1`,
        children: `Content of Tab Pane 1`,
      },
      {
        key: '2',
        label: `Tab 2`,
        children: `Content of Tab Pane 2`,
      },
      {
        key: '3',
        label: `Tab 3`,
        children: `Content of Tab Pane 3`,
      },
    ];
    const onChange = (key) => {
      console.log(key);
    };
    // container.firstChild为React渲染的对应DOM节点
    const { container } = render(<Tabs defaultActiveKey="1" items={items} onChange={onChange} />);
    // toMatchSnapshot为执行快照对比
    expect(container.firstChild).toMatchSnapshot();
  });

  // 禁用
  it('test case1 for disable', () => {
    const { container } = render(
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: 'Tab 1',
            key: '1',
            children: 'Tab 1',
          },
          {
            label: 'Tab 2',
            key: '2',
            children: 'Tab 2',
            disabled: true,
          },
          {
            label: 'Tab 3',
            key: '3',
            children: 'Tab 3',
          },
        ]}
      />,
    );
  });
});
