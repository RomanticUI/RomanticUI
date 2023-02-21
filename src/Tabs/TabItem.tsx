import React, { ReactNode } from 'react';

export interface TabItemType {
  closeIcon?: ReactNode;
  disabled?: boolean;
  forceRender?: boolean;
  key: string;
  label: ReactNode; // 选项卡头显示文字
  children: ReactNode; // 选项卡头显示内容
}

export interface TabItemProps extends TabItemType {
  className: string;
}

const TabItem: React.FC<TabItemProps> = (props) => {
  const { key, className, children } = props;

  return (
    <div key={key} className={className}>
      {children}
    </div>
  );
};

TabItem.displayName = 'tabItem';

export default TabItem;
