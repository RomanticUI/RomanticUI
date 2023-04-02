import { CSSProperties, ReactNode } from 'react';
export interface TableProps {
  bordered: boolean; // 是否展示外边框和列边框
  columns: ColumnProps[];
  components: ReactNode; // 覆盖默认的 table 元素
  dataSource: object[]; // 数据数组
  expandable: ExpandableProps; // 配置展开属性
  footer: (currentPageData: number) => ReactNode; // 表格尾部
  loading: boolean; // 页面是否加载中
  size?: 'small' | 'middle' | 'large';
  rowSelection: RowSelectionProps;
  align: 'left' | 'center' | 'right';
  maxRows: number;
  style: CSSProperties;
  className: string;
}

export interface ColumnProps {
  align: left | right | center;
  title: string;
  dataIndex: string;
  defaultSortOrder: ascend | descend; // 排序顺序
  key: string;
  render?: (text, record, index) => ReactNode;
  sortDirections?: Array<SortOrderType>;
  sortOrder?: SortOrderType;
  sorter?: function | boolean;
}

type SortOrderType = 'ascend' | 'descend' | null;

// 导出
export interface RowSelectionProps {
  type: 'checkbox' | 'radio'; // 单选或多选
  onChange: (selectedRowKeys, selectedRows, info: { type }) => void; // 选中项发生变化时的回调
  onSelect: (record, selected, selectedRows, nativeEvent) => void; // 用户手动选择/取消选择某行的回调
}

export interface ExpandableProps {}
