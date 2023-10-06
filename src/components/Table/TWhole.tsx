import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import combinationFuns from '../utils/combinationFuns';
import sortChosed from './icons/sort-chosed.png';
import sort from './icons/sort.png'; //引入排序的icon
import { ColumnProps, SortOrderType, TableProps } from './index.d';
import { dataSlice, selectInit } from './steps';
import TContent from './TContent';

interface TWholeProps extends TableProps {}

const TWhole: React.FC<TWholeProps> = (props) => {
  const { columns, rowSelection, dataSource, maxRows = 10, align = 'left' } = props;

  const prefixCls = 'romantic-table';

  const checkAll = useRef<HTMLInputElement | null>(null); // 全选的节点

  const [pageNum, setPageNum] = useState<number>(0); // 页数
  const [chosedRowsData, setChosedRowsData] = useState<Array<any>>([]); // 选中的数据
  const [sortFnKeys, setSortFnKeys] = useState<Array<string>>([]); // 筛选函数的key

  /**
   * 处理函数
   * ******************************************************************
   */

  // 数据的初始化
  const [newDataSource, setNewDataSource] = useState(() => {
    const fns = [dataSlice];
    rowSelection && fns.push(selectInit);
    return combinationFuns(fns)(dataSource, maxRows);
  });

  // pageNum改变，全选状态改变
  useEffect(() => {
    if (checkAll.current) {
      const checkAllBox = checkAll.current as HTMLInputElement;

      if (getCurrentPageunChecked() === newDataSource[pageNum].length) {
        checkAllBox.checked = false;
      } else {
        checkAllBox.checked = true;
      }
    }
  }, [pageNum]);

  // 获取已经选中的个数
  const getCurrentPageunChecked = () => {
    return (newDataSource[pageNum] as Object[]).filter((val: any) => val.checked === false).length;
  };

  // 全选和取消全选的处理
  const handleCheckAllClick = (e: any) => {
    const checkAllBox = checkAll.current as HTMLInputElement;
    const checkedNum = getCurrentPageunChecked(); // 未选中的个数
    // 全选
    if (checkedNum !== 0 && checkedNum <= newDataSource[pageNum].length) {
      checkAllBox.checked = true;
      setNewDataSource((preData: any) => {
        return selectAllDetail(preData, true);
      });
      setChosedRowsData((preData: any) => {
        let temp = [...preData];
        temp[pageNum] = newDataSource[pageNum].map((val: any) => val.key); // 存储key
        return temp;
      });
    } else {
      // 取消全选
      checkAllBox.checked = false;
      setNewDataSource((preData: any) => {
        return selectAllDetail(preData, false);
      });

      setChosedRowsData((preData: any) => {
        let temp = [...preData];
        temp[pageNum] = [];
        return temp;
      });
    }
  };

  // 全选的详细处理
  const selectAllDetail = (data: any, status: boolean) => {
    let temp = [...data];
    const modifyData = temp[pageNum].map((val: any) => ({
      ...val,
      checked: status,
    }));
    temp[pageNum] = modifyData;
    return temp;
  };

  // 选框的响应
  const responseCheck = (index: number, rowData: any, status: boolean) => {
    const checkAllBox = checkAll.current as HTMLInputElement;
    // 判断全选状态是否需要修改
    if (status === false) {
      checkAllBox.checked === true && (checkAllBox.checked = false);
    } else {
      getCurrentPageunChecked() - 1 === 0 && (checkAllBox.checked = true);
    }

    // 更新选中状态
    setNewDataSource((pre: any) => {
      const temp = [...pre];
      temp[pageNum][index].checked = status;
      console.log(temp[pageNum]);
      return temp;
    });

    // 更新选中数据
    setChosedRowsData((pre: any) => {
      let temp = [...pre];
      if (status) {
        temp[pageNum] ? temp[pageNum].push(rowData.key) : (temp[pageNum] = [rowData.key]);
        return temp;
      }
      temp[pageNum] = temp[pageNum].filter((val: any) => val !== rowData.key);
      return temp;
    });
  };

  // 判断是否选中该排序
  const judgeSortChosed = (fnkey: string) => {
    // 未被选中
    if (sortFnKeys.indexOf(fnkey) === -1) {
      return sort;
    } else {
      return sortChosed;
    }
  };

  // 点击排序事件
  const clickSortHandle = (e: any) => {
    const colNode: HTMLElement = e.currentTarget;
    let fnkey = colNode.querySelector('img')?.dataset?.fnkey; // 获取到需要排序的key

    // 如果排序函数中存在，那么就修改排序类型 ——> 升序、降序、取消排序
    if (fnkey) {
      const sortIndex: number = sortFnKeys.indexOf(fnkey);
      if (sortIndex !== -1) {
        sortFnKeys.push(fnkey);
      } else {
        // 分割字符串 "1-1"
        let [key1, key2] = sortFnKeys[sortIndex].split('-');
      }
    }
  };

  // 数据展示前的预处理，排序、筛选
  const dataPretreatment = () => {
    // 1. 筛选

    // 2. 排序
    sortFnKeys.forEach((fnkey: string) => {});
  };
  /**
   * 页面渲染
   * ******************************************************************
   */
  const renderControllSort = (val: SortOrderType[], key: number) => {
    {
      /* 是否有排序，如何排序 */
    }
    return (
      <div className={`${prefixCls}-sort-controll`}>
        {val?.map((type: SortOrderType, key2: number) => {
          const fnkey = `${key}-${key2}`;
          return (
            <img
              data-fnkey={fnkey}
              key={fnkey}
              className={classNames(`${prefixCls}-sort-icon-${type}`)}
              src={judgeSortChosed(fnkey)}
            />
          );
        })}
      </div>
    );
  };

  const renderControllFilter = () => {};

  const renderControll = (colValue: ColumnProps, key: number) => {
    return (
      <div className={`${prefixCls}-cell-innercontainer`} onClick={clickSortHandle}>
        {colValue.title}
        <div className={`${prefixCls}-controll-functions`}>
          {colValue.sortDirections && renderControllSort(colValue.sortDirections, key)}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* 表头 */}
      <thead className={`${prefixCls}-thead`}>
        <tr>
          {/* 多选或单选 */}
          {rowSelection ? (
            rowSelection.type === 'checkbox' ? (
              <th className={`${prefixCls}-cell ${prefixCls}-selection-column`}>
                <div className={`${prefixCls}-selection ${prefixCls}-align-${align}`}>
                  <label>
                    <input
                      type="checkbox"
                      className={`${prefixCls}-selection-select`}
                      ref={checkAll}
                      onClick={handleCheckAllClick}
                    />
                  </label>
                </div>
              </th>
            ) : (
              <td className={`${prefixCls}-cell ${prefixCls}-selection-column`}></td>
            )
          ) : null}
          {columns.map((val: ColumnProps, index: number) => {
            return (
              <th key={val.title} className={`${prefixCls}-cell ${prefixCls}-head-cell`}>
                {/* //`${prefixCls}-cell-innercontainer ${prefixCls}-align-${align}` */}
                <div
                  className={classNames({
                    [`${prefixCls}-align-${align}`]: `${align}`,
                    [`${prefixCls}-hover`]: val.sortDirections?.length,
                  })}
                >
                  {renderControll(val, index)}
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
      {/* 表单内容 */}
      <TContent
        dataSource={newDataSource[pageNum]}
        columns={columns}
        rowSelection={rowSelection}
        responseCheck={responseCheck}
      ></TContent>
    </>
  );
};

export default TWhole;
