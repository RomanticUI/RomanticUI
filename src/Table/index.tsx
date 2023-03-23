import React, { useState } from 'react';
import './style/index.less';
import { TableProps } from "./index.d"
import classNames from 'classnames';
import TWhole from './TWhole';
import { SizeContext } from '../config-provider';


const Table: React.FC<TableProps> = (props) => {
    const {
        size: propSize = 'large',
        bordered = false,
        align = 'center',
        className,
        style
    } = props

    const prefixCls = 'romantic-table';

    return (
        <SizeContext.Consumer>
            {
                (contextSize) => {
                    const size = propSize !== undefined ? propSize : contextSize
                    return (
                        <div
                            className={
                                classNames(
                                    `${prefixCls}`,
                                    className,
                                    {
                                        [`${prefixCls}-${size}`]: size,
                                        [`${prefixCls}-bordered`]: bordered,
                                        [`${prefixCls}-align-${align}`]: align,
                                    }
                                )
                            }
                            style={style}
                        >
                            <table className={`${prefixCls}-table`}>
                                <TWhole {...props}></TWhole>
                            </table>
                        </div>
                    )
                }
            }
        </SizeContext.Consumer>
    )
}

export default Table;