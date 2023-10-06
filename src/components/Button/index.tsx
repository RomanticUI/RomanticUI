import React, { CSSProperties, useState } from 'react';
import './style/index.less';
import { SizeContext } from '../config-provider';
import classNames from 'classnames';

export interface ButtonProps {
    size: "small" | "middle" | "large",
    className: string,
    style: CSSProperties,
    type: "primary" | "dashed" | "link" | "text" | "default",
    children: JSX.Element,
    onClick: (event: MouseEvent) => void,
    disabled: boolean
}

const Button: React.FC<Partial<ButtonProps>> = (props) => {
    let {
        size: propSize = "middle",
        className,
        style,
        type = "default",
        children,
        onClick,
        disabled
    } = props

    const prefixCls = 'romantic-btn';

    return (
        <SizeContext.Consumer>
            {
                (contextSize) => {
                    const size = propSize !== undefined ? propSize : contextSize;
                    return (
                        <button
                            className={classNames(`${prefixCls}`, className, {
                                [`${prefixCls}-${size}`]: size,
                                [`${prefixCls}-${type}`]: type
                            })}
                            style={style}
                            // @ts-ignore
                            onClick={onClick}
                            disabled={disabled}
                        >
                            <span>{children}</span>
                        </button>
                    )
                }
            }
        </SizeContext.Consumer>
    )
}

export default Button;