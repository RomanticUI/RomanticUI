// 引入测试组件
import React from 'react';
import Menu from '..';
// 使用@testing-library/react渲染对应组件
import { render } from '@testing-library/react';

describe('Divider test', () => {
  it('test case1 for night', () => {
    const item = [
      {
        label: 'Navigation One',
        optionKey: 'mail',
      },
      {
        label: 'Navigation Two',
        optionKey: 'app',
        children: [
          {
            label: 'Option 1',
            optionKey: 'setting:1',
          },
          {
            label: 'Option 2',
            optionKey: 'setting:2',
          },
          {
            label: 'Option 3',
            optionKey: 'setting:3',
          },
        ],
      },
      {
        label: 'Navigation Three - Submenu-kkkkkkk',
        optionKey: 'SubMenu',
        children: [
          {
            type: 'group',
            label: 'Item 1',
            children: [
              {
                label: 'Option 4',
                optionKey: 'setting:4',
              },
              {
                label: 'Option 5',
                optionKey: 'setting:5',
              },
            ],
          },
          {
            type: 'group',
            label: 'Item 2',
            children: [
              {
                label: 'Option 6',
                optionKey: 'setting:6',
              },
              {
                label: 'Option 7',
                optionKey: 'setting:7',
              },
            ],
          },
        ],
      },
      {
        label: 'alipay',
        optionKey: 'alipay',
      },
    ];
    const { container } = render(<Menu items={item} theme="night"></Menu>);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('test case1 for solid', () => {
    const item = [
      {
        label: 'Navigation One',
        optionKey: 'mail',
      },
      {
        label: 'Navigation Two',
        optionKey: 'app',
        children: [
          {
            label: 'Option 1',
            optionKey: 'setting:1',
          },
          {
            label: 'Option 2',
            optionKey: 'setting:2',
          },
          {
            label: 'Option 3',
            optionKey: 'setting:3',
          },
        ],
      },
      {
        label: 'Navigation Three - Submenu',
        optionKey: 'SubMenu',
        children: [
          {
            type: 'group',
            label: 'Item 1',
            children: [
              {
                label: 'Option 4',
                optionKey: 'setting:4',
              },
              {
                label: 'Option 5',
                optionKey: 'setting:5',
              },
            ],
          },
          {
            type: 'group',
            label: 'Item 2',
            children: [
              {
                label: 'Option 6',
                optionKey: 'setting:6',
              },
              {
                label: 'Option 7',
                optionKey: 'setting:7',
              },
            ],
          },
        ],
      },
      {
        label: 'alipay',
        optionKey: 'alipay',
      },
    ];
    const { container } = render(<Menu items={item} mode="vertical" theme="night"></Menu>);

    expect(container.firstChild).toMatchSnapshot();
  });
});
