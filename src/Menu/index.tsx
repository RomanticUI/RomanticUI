import React, { createContext, useEffect, useState } from 'react';
import './style/index.less';

interface SingleItem {
  label: string;
  optionKey?: string;
  icon?: any;
  children?: AllItems;
  type?: string;
  handleSonCheck?: React.Dispatch<React.SetStateAction<boolean>>;
}

type AllItems = Array<SingleItem>;

type MenuProps = { mode?: string; items: AllItems; isTop?: boolean };

const SubMenu: React.FC<MenuProps> = ({ items, isTop = false, ...others }: MenuProps) => {
  useEffect(() => {}, []);

  const [sonCheck, setSoncheck] = useState<boolean>(false);

  return (
    <div className="main">
      <ul className={isTop ? 'topUl' : 'subUl'}>
        {/* {items.map((curr, index) => {
          return (
            
            <li key={curr.key}>
              <div>
                <span>{curr.label}</span>

                {curr.childern ? <SubMenu items={curr.childern} isTop={false}></SubMenu> : ""}
              </div>
            </li>
          );
        })} */}
        {items.map((curr, index) => {
          //   console.log(curr.key);
          return curr.children ? (
            // 如果type为group 就不生成span,并且li类为group
            curr.type == 'group' ? (
              <li className="group">
                <span>{curr.label}</span>
                <SubMenu items={curr.children!} />
              </li> /* 否则生成span */
            ) : (
              <li key={curr.optionKey}>
                <span>{curr.label}</span>
                <SubMenu items={curr.children!} />
              </li>
            )
          ) : (
            <MenuItem {...curr} />
          );
        })}
      </ul>
    </div>
  );
};

const MenuItem: React.FC<SingleItem> = (props) => {
  // const Clicked:(clickedName:string)=>void=(clickedName)=>{
  //   clickedName==key?
  // }

  let { label, optionKey, ...others } = props;
  console.log(props);
  return (
    <Consumer>
      {(value) => {
        // console.log(value);
        // console.log(key);
        return (
          <li
            key={optionKey!}
            className="ItemLi"
            onClick={() => value.changeKey!(optionKey!)}
            style={{ backgroundColor: optionKey == value.keyCked ? 'red' : '' }}
          >
            <span>{label}</span>
          </li>
        );
      }}
    </Consumer>
  );
};

const { Provider, Consumer } = createContext<{
  keyCked: string;
  changeKey: React.Dispatch<React.SetStateAction<string>> | null;
}>({} as any);

const Menu: React.FC<MenuProps> = ({ items, isTop = true, ...others }: MenuProps) => {
  //   const item: MenuProps = [
  //     { label: 'anc', key: 'aaa', childern: [{ label: 'anc', key: 'aaa' }] },
  //     { label: 'anc', key: 'aaa', childern: [{ label: 'anc', key: 'aaa' }] },
  //   ];

  useEffect(() => {}, []);

  const [keyCked, changeKey] = useState('');

  return (
    // <div className="main">
    //   <ul className={isTop ? 'topUl' : 'subUl'}>
    //     {items.map((curr, index) => {
    //       return (
    //         <li key={curr.key}>
    //           <div>
    //             <span>{curr.label}</span>

    //             {curr.childern ? <Menu items={curr.childern} isTop={false}></Menu> : ''}
    //           </div>
    //         </li>
    //       );
    //     })}
    //   </ul>
    // </div>
    <Provider value={{ keyCked, changeKey }}>
      <div className="MenuBox main">
        <ul className={isTop ? 'topUl' : 'subUl'}>
          {items.map((curr, index) => {
            // console.log({ ...curr });
            return curr.children ? (
              <li key={curr.optionKey}>
                <span>{curr.label}</span>
                <SubMenu items={curr.children!} />
              </li>
            ) : (
              <MenuItem {...curr} />
            );
          })}
        </ul>
      </div>
    </Provider>
  );
};

export default Menu;
export type { AllItems };
