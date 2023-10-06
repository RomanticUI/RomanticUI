import React from 'react';
import { ColumnProps, RowSelectionProps } from './index.d';

export interface TContentProps {
  dataSource: object[];
  columns: ColumnProps[];
  rowSelection?: RowSelectionProps;
  responseCheck: (index: number, rowData: Object, status: boolean) => void;
}

export interface SelectType {
  key: string;
  rowData: Object;
  checked: boolean;
}

const TContent: React.FC<TContentProps> = (props) => {
  const { dataSource, columns, rowSelection, responseCheck } = props;

  const prefixCls = 'romantic-table';

  const selectCheck = (e: any, rowData: Object, index: number) => {
    console.log(e.target.checked);
    responseCheck(index, rowData, e.target.checked);
  };

  return (
    <tbody>
      {
        // rowData单行数据
        dataSource.map((rowData, index) => (
          <tr key={(rowData as any).key || index}>
            {rowSelection && (
              <td className={`${prefixCls}-cell ${prefixCls}-selection-column`}>
                {rowSelection.type === 'checkbox' ? (
                  <input
                    type="checkbox"
                    name="singleRow"
                    checked={(rowData as any).checked}
                    className={`${prefixCls}-selection-select`}
                    onChange={(e) => selectCheck(e, rowData, index)}
                  />
                ) : (
                  <input
                    type="radio"
                    name="singleRow"
                    checked={(rowData as any).checked}
                    className={`${prefixCls}-selection-select`}
                    onChange={(e) => selectCheck(e, rowData, index)}
                  />
                )}
              </td>
            )}
            {
              // colVal列数据
              columns.map((colVal, colIndex) => {
                const currentVal = (rowData as any)?.[colVal.dataIndex];
                return (
                  // 如果有复杂情况，使用render渲染
                  <td key={colIndex} className={`${prefixCls}-cell`}>
                    {/* {currentVal} */}
                    {(colVal?.render && colVal?.render(currentVal || '', rowData, colIndex)) ||
                      currentVal}
                  </td>
                );
              })
            }
          </tr>
        ))
      }
    </tbody>
  );
};

export default TContent;
