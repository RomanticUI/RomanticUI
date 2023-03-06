import { ReactNode } from 'react';
export interface TableProps {
  bordered: boolean; // 是否展示外边框和列边框
  columns: ColumnProps[];
  components: ReactNode; // 覆盖默认的 table 元素
  dataSource: object[]; // 数据数组
  expandable: ExpandableProps; // 配置展开属性
  footer: (currentPageData: number) => ReactNode; // 表格尾部
  loading: boolean; // 页面是否加载中
}

export interface ColumnProps {}

export interface ExpandableProps {}
