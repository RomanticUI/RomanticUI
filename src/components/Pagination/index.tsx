import React, { CSSProperties, useEffect, useState } from 'react';
import './style/index.less';

import { ReactComponent as Arrow } from './icon/arrow.svg';

export interface PaginationProps {
  current?: number; // 当前页面
  pageSize?: number; // 每页条数
  disabled?: boolean; // 禁止分页
  hideOnSinglePage?: boolean; // 只有一页时隐藏分页器
  total?: number; // 数据总数
  itemRender?: Record<'pre' | 'next' | 'page', React.ReactNode>;
  onChange?: (page: number, pageSize: number) => void; // 页码或者pageSize改变时回调，参数时修改后的页面及每页条数
  onShowSizeChange?: (current: number, size: number) => void; // pageSize 变化的回调
  style?: CSSProperties;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = (props) => {
  let { current = 1, pageSize = 10, total, itemRender, style, className = '' } = props;
  const prefixCls = 'romantic-pagination';

  const [currentPage, setCurrentPage] = useState<number>(current);

  console.log('arrow', Arrow);

  useEffect(() => { }, []);

  return (
    <ul className={`${className} ${prefixCls}`} style={style}>
      {/* 总页数信息 */}
      {total !== undefined && <li className={`${prefixCls}-total-text`}>{total}</li>}
      {/* 上一页 */}
      <li>
        {itemRender && itemRender.pre ? (
          itemRender.pre
        ) : (
          <button>
            <span>
              <Arrow />
            </span>
          </button>
        )}
      </li>
      {/* 下一页 */}
      <li>
        {itemRender && itemRender.next ? (
          itemRender.next
        ) :
          (
            <button>
              <span>
                <Arrow />
              </span>
            </button>
          )
        }
      </li>
    </ul>
  );
};

export default Pagination;
