// 引入测试组件
import React from 'react';
import Avatar from '..';
// 使用@testing-library/react渲染对应组件
import { render } from '@testing-library/react';

describe('Avatar', () => {
  it('test case1 for circle', () => {
    const { container } = render(
      <Avatar
        shape="circle"
        size="40px"
        AvatarImg="https://avatars.githubusercontent.com/u/111177624?v=4"
      ></Avatar>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('test case1 for square', () => {
    const { container } = render(
      <Avatar
        shape="square"
        size="40px"
        AvatarImg="https://avatars.githubusercontent.com/u/111177624?v=4"
      ></Avatar>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
