import classNames from 'classnames';
import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';

import { SizeContext, SizeType } from '../config-provider';
import { judgeIsOverFlow, throttle } from '../utils';
import './style/index.less';
import TabItem, { TabItemType } from './TabItem';

export type TabsType = 'line' | 'card' | 'editable-card';
export type TabsPosition = 'top' | 'right' | 'bottom' | 'left';

export interface TabsProps {
  className?: string;
  style?: CSSProperties;
  size: SizeType;
  items: TabItemType[];
  tabPosition: TabsPosition;
  centered: boolean; // 是否居中
  activeKey?: string;
  defaultActiveKey?: string;
  addIcon: ReactNode;

  onChange?: (activeKey: string) => void; // 切换面板的回调
  onTabClick?: (key: string, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void; // tab 被点击的回调 key对应tabitem的activeKey
}

const Tabs: React.FC<TabsProps> = (props) => {
  const {
    size: propSize,
    className,
    style,
    items,
    tabPosition = 'top',
    centered = false,
    activeKey,
    defaultActiveKey = items[0].key,
    onChange,
    onTabClick,
  } = props;

  const prefixCls = 'romantic-tabs';
  const direction = tabPosition === 'top' || tabPosition === 'bottom' ? 'row' : 'col';
  const [currentKey, setCurrentKey] = useState<string | undefined>(defaultActiveKey); // 默认值为第一个面板
  const [slipLength, setSlipLength] = useState<number>(0);

  // 获取nav节点
  const scrollNav = useRef<HTMLDivElement | null>(null);

  // 绑定滚动事件，阻止页面滚动
  useEffect(() => {
    // 判断是否溢出
    const isOverFlow = judgeIsOverFlow<HTMLDivElement>(
      scrollNav as React.MutableRefObject<HTMLDivElement>,
      'row',
    );
    if (isOverFlow) {
      (scrollNav.current as HTMLDivElement).addEventListener(
        'wheel',
        (e) => throttleWheel(e, direction),
        { passive: false },
      );
      return () =>
        (scrollNav.current as HTMLDivElement).removeEventListener(
          'wheel',
          (e) => throttleWheel(e, direction),
          false,
        );
    }
  }, []);

  const handleWheel = (evnet: WheelEvent) => {
    const { deltaY } = evnet;
    setSlipLength((slipLength) => {
      const res = slipLength - deltaY;
      console.log('scrollWidth', scrollNav.current?.scrollWidth, res);
      const max = scrollNav.current?.scrollWidth || 0;
      if (res <= -max) {
        return -max;
      } else if (res >= 0) {
        return 0;
      } else {
        return res;
      }
    });
  };

  const throttleWheel = throttle(handleWheel, 50);

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
   *  @description 渲染标签 ， 由li标签组成
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
          <nav
            style={style}
            className={classNames(`${prefixCls}`, {
              [`${prefixCls}-${size}`]: size,
              [`${prefixCls}-${tabPosition}`]: true,
              // 外联样式
              className,
            })}
          >
            <div
              className={classNames(`${prefixCls}-nav`, {
                [`${prefixCls}-nav-partition-${tabPosition}`]: tabPosition,
              })}
            >
              <div
                className={classNames(`${prefixCls}-nav-wrap`, {
                  [`${prefixCls}-nav-centered`]: centered,
                })}
                style={{
                  transform:
                    direction === 'row'
                      ? `translate(${slipLength}px,0)`
                      : `translate(0,${slipLength}px)`,
                }}
                ref={scrollNav}
              >
                {renderTabItemLabel()}
              </div>
            </div>
            {/* 展示的内容 */}
            <div>{renderItemContent()}</div>
          </nav>
        );
      }}
    </SizeContext.Consumer>
  );
};

export default Tabs;
