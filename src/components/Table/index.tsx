import classNames from 'classnames';
import React from 'react';
import { SizeContext } from '../config-provider';
import { TableProps } from './index.d';
import './style/index.less';
import TWhole from './TWhole';

const Table: React.FC<TableProps> = (props) => {
  const { size: propSize = 'large', bordered = false, align = 'left', className, style } = props;

  const prefixCls = 'romantic-table';

  return (
    <SizeContext.Consumer>
      {(contextSize) => {
        const size = propSize !== undefined ? propSize : contextSize;
        return (
          <div
            className={classNames(`${prefixCls}`, className, {
              [`${prefixCls}-${size}`]: size,
              [`${prefixCls}-bordered`]: bordered,
              [`${prefixCls}-align-${align}`]: align,
            })}
            style={style}
          >
            <table className={`${prefixCls}-table`}>
              <TWhole {...props}></TWhole>
            </table>
          </div>
        );
      }}
    </SizeContext.Consumer>
  );
};

export default Table;
