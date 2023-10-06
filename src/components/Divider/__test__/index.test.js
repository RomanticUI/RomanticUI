// 引入测试组件
import React from 'react';
import Divider from '..';
// 使用@testing-library/react渲染对应组件
import { render } from '@testing-library/react';

describe('Divider test', () => {
  it('test case1 for dashed', () => {
    const { container } = render(<Divider content={'text'} dashed={true} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('test case1 for solid', () => {
    const { container } = render(<Divider content={''} dashed={false} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
