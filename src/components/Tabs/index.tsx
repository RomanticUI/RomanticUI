import classNames from 'classnames';
import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';

import { SizeContext, SizeType } from '../config-provider';
import { judgeIsOverFlow, throttle } from '../utils';
import './style/index.less';
import TabItem, { TabItemType } from './TabItem';

export type TabsType = 'line' | 'card' | 'editable-card';
export type TabsPosition = 'top' | 'right' | 'bottom' | 'left';
export type TabsDirection = 'row' | 'col';
export interface SlipProps {
  length: number;
  maxLength: number;
}
export interface ExtraContentProps {
  left?: ReactNode;
  right?: ReactNode;
}

export interface TabsProps {
  className?: string;
  style?: CSSProperties;
  size: SizeType;
  items: TabItemType[];
  tabPosition: TabsPosition;
  centered: boolean; // 是否居中
  type: 'line' | 'card';
  activeKey?: string;
  defaultActiveKey?: string;
  addIcon: ReactNode;
  tabBarExtraContent: ReactNode | ExtraContentProps; // tab bar 上额外的元素
  onChange?: (activeKey: string) => void; // 切换面板的回调
  onTabClick?: (key: string, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void; // tab 被点击的回调 key对应tabitem的activeKey
}

const Tabs: React.FC<TabsProps> = (props) => {
  let {
    size: propSize,
    className,
    style,
    items,
    tabPosition = 'top',
    centered = false,
    type = 'line',
    activeKey,
    defaultActiveKey = items[0].key,
    tabBarExtraContent,
    onChange,
    onTabClick,
  } = props;

  const prefixCls = 'romantic-tabs';
  const direction: TabsDirection =
    tabPosition === 'top' || tabPosition === 'bottom' ? 'row' : 'col';

  const [currentKey, setCurrentKey] = useState<string | undefined>(activeKey || defaultActiveKey); // 默认值为第一个面板
  const [slip, setSlip] = useState<SlipProps>({
    length: 0,
    maxLength: 0,
  });

  // 获取scroll节点
  const scrollNav = useRef<HTMLDivElement | null>(null);

  // 获取viewNav节点
  const viewNav = useRef<HTMLDivElement | null>(null);

  // 滚动事件
  const handleWheel = (evnet: WheelEvent) => {
    const { deltaY } = evnet;

    setSlip((slip) => {
      const res = slip.length - deltaY;
      if (res <= -slip.maxLength) {
        return {
          ...slip,
          length: -slip.maxLength,
        };
      } else if (res >= 0) {
        return {
          ...slip,
          length: 0,
        };
      } else {
        return {
          ...slip,
          length: res,
        };
      }
    });
  };

  const throttleWheel = throttle(handleWheel, 50);

  // 绑定原生滚动事件，阻止页面滚动
  useEffect(() => {
    // 判断是否溢出
    const isOverFlow = judgeIsOverFlow<HTMLDivElement>(
      scrollNav as React.MutableRefObject<HTMLDivElement>,
      direction,
    );
    if (isOverFlow) {
      (viewNav.current as HTMLDivElement).addEventListener('wheel', (e) => throttleWheel(e), {
        passive: false,
      });

      // 设置最长滚动长度
      if (direction === 'row') {
        setSlip((slip) => {
          return {
            ...slip,
            maxLength:
              (scrollNav.current?.scrollWidth as number) -
              (scrollNav.current?.clientWidth as number),
          };
        });
      } else {
        setSlip((slip) => {
          return {
            ...slip,
            maxLength:
              (scrollNav.current?.scrollHeight as number) -
              (scrollNav.current?.clientHeight as number),
          };
        });
      }
    }
  }, []);

  /**
   *
   * @param key 点击当前tab的key值
   * @param disable 是否不可用
   * @param event 事件对象
   */
  const handleClick = (
    key: string,
    isDisable: boolean = false,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    // 点击与当前不同的tab 且 该tab是可用的
    if (key !== currentKey && isDisable === false) {
      onChange && onChange(key);
      onTabClick && onTabClick(key, event);
      setCurrentKey(key);
    }
  };

  /**
   *  @description 渲染标签
   */
  const renderTabItemLabel = () =>
    items.map((value: TabItemType) => {
      const { disabled, key } = value;

      const classes = classNames(`${prefixCls}-label`, {
        [`${prefixCls}-label-disabled`]: disabled, // 是否可用
        [`${prefixCls}-label-active`]: key === currentKey, // 是否激活
      });

      return (
        <div
          key={key}
          className={classes}
          data-disable={disabled}
          onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
            handleClick(value.key, value.disabled, event)
          }
        >
          {value.label}
        </div>
      );
    });

  /**
   * @description 渲染内容
   *
   */
  const renderItemContent = () =>
    items.map((value: TabItemType) => {
      const { key } = value;

      const classes = classNames(`${prefixCls}-content`, {
        [`${prefixCls}-content-active`]: key === currentKey,
      });

      return React.cloneElement(<TabItem {...value} className={classes}></TabItem>);
    });

  return (
    <SizeContext.Consumer>
      {(contextSize) => {
        const size = propSize !== undefined ? propSize : contextSize;
        return (
          <div
            style={style}
            className={classNames(`${prefixCls}`, {
              [`${prefixCls}-${type}`]: type,
              [`${prefixCls}-${size}`]: size,
              [`${prefixCls}-${tabPosition}`]: true,
              // 外联样式
              className,
            })}
          >
            <div
              ref={viewNav}
              className={classNames(`${prefixCls}-nav`, {
                [`${prefixCls}-nav-partition-${tabPosition}`]: tabPosition,
              })}
            >
              <div
                ref={scrollNav}
                className={classNames(`${prefixCls}-nav-wrap`, {
                  [`${prefixCls}-nav-centered`]: centered,
                })}
                style={{
                  transform:
                    direction === 'row'
                      ? `translate(${slip.length}px,0)`
                      : `translate(0,${slip.length}px)`,
                }}
              >
                {(tabBarExtraContent as any)?.left ? (
                  <div>{(tabBarExtraContent as any)?.left || ''}</div>
                ) : null}
                {renderTabItemLabel()}
              </div>
              {<div>{(tabBarExtraContent as any)?.right || tabBarExtraContent}</div>}
            </div>
            {/* 展示的内容 */}
            <div>{renderItemContent()}</div>
          </div>
        );
      }}
    </SizeContext.Consumer>
  );
};

export default Tabs;
