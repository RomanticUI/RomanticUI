import React, { createContext, useEffect, useRef, useState } from 'react';
import './style/index.less';

interface SingleItem {
  label: string;
  optionKey?: string;
  icon?: any;
  children?: AllItems;
  type?: string;
  disable?: boolean;
}

type AllItems = Array<SingleItem>;

type MenuProps = {
  mode?: 'vertical' | 'horizontal';
  items: AllItems;
  isTop?: boolean;
  theme?: 'light' | 'night';
};

const SubMenu: React.FC<SingleItem> = ({
  label,
  optionKey,
  children,
  type,
  disable = false,
  ...others
}: SingleItem) => {
  const [sonCheck, setSoncheck] = useState<boolean>(false);

  /* 使用ref绑定span */
  const spanRef = useRef<HTMLSpanElement>(null);

  return (
    <Consumer>
      {(value) => {
        return (
          /* 判断是否是禁用样式 是否为group */
          <li
            key={optionKey}
            className={
              disable
                ? type == 'group'
                  ? 'disable group'
                  : 'disable'
                : type == 'group'
                  ? ' group'
                  : ''
            }
          >
            {/* 如果是disable 生成无交互元素 */}

            {disable ? (
              <div className="main">
                <span>{label}</span>
              </div>
            ) : (
              <div
                className="main"
                onClick={() => {
                  value.changeKey_Sub!(optionKey!);
                }}
              >
                <span
                  ref={spanRef}
                  className={optionKey == value.keyCked_Sub ? 'subSpanClicked' : ''}
                >
                  {label}
                </span>
                <ul className={'subUl' + ' ' + value.theme}>
                  {children
                    ? children!.map((curr, index) => {
                      //   console.log(curr.key);
                      return curr.children ? (
                        // 如果type为group 就不生成span,并且li类为group
                        curr.type == 'group' ? (
                          <SubMenu {...curr} key={curr.label} />
                        ) : (
                          /* 否则生成span */
                          <SubMenu {...curr} key={curr.label} />
                        )
                      ) : (
                        /* 传入handle函数，当子组件被点击后通知父组件 */
                        <MenuItem {...curr} key={curr.label} />
                      );
                    })
                    : ''}
                </ul>
              </div>
            )}
          </li>
        );
      }}
    </Consumer>
  );
};

const MenuItem: React.FC<SingleItem> = (props) => {
  let { label, optionKey, disable = false, ...others } = props;

  /* 鼠标点击后的处理函数 */
  type ConsumerValue = {
    keyCked_Item: string;
    changeKey_Item: React.Dispatch<React.SetStateAction<string>> | null;
  };
  const ItemClicked: ({ changeKey_Item }: ConsumerValue) => void = ({ changeKey_Item }) => {
    changeKey_Item!(optionKey!);
  };

  // console.log(props);
  return (
    <Consumer>
      {(value) => {
        return (
          /* 如果是disable 生成无交互元素 */
          disable ? (
            <li className="disable">
              <span>{label}</span>
            </li>
          ) : (
            <li
              key={optionKey!}
              className={optionKey == value.keyCked_Item ? 'ItemClicked ItemLi' : 'ItemLi'}
              onClick={() => ItemClicked(value)}
            >
              <span>{label}</span>
            </li>
          )
        );
      }}
    </Consumer>
  );
};

const { Provider, Consumer } = createContext<{
  keyCked_Item: string;
  changeKey_Item: React.Dispatch<React.SetStateAction<string>> | null;
  keyCked_Sub: string;
  changeKey_Sub: React.Dispatch<React.SetStateAction<string>> | null;
  themeStyle?: {
    backcolor: string;
    clickedFontClor: string;
    clickedBackClor: string;
  };
  theme: 'light' | 'night';
}>({} as any);

const Menu: React.FC<MenuProps> = ({
  items,
  isTop = true,
  theme = 'light',
  mode = 'horizontal',
  ...others
}: MenuProps) => {
  useEffect(() => { }, []);

  const [keyCked_Item, changeKey_Item] = useState('');
  const [keyCked_Sub, changeKey_Sub] = useState('');

  return (
    <Provider value={{ keyCked_Item, changeKey_Item, keyCked_Sub, changeKey_Sub, theme }}>
      <div className="MenuBox main">
        {/* Menu模式 以及Menu主题 */}
        <ul className={'subUl' + ' ' + theme + ' ' + mode + ' ' + 'top'}>
          {items.map((curr, index) => {
            // console.log({ ...curr });
            return <SubMenu {...curr} key={index} />;
          })}
        </ul>
      </div>
    </Provider>
  );
};

export default Menu;
export type { AllItems };
