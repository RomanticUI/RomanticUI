import React, { useEffect, useRef, useState } from "react";
import { TableProps } from "./index.d";
import combinationFuns from "../utils/combinationFuns";
import { dataSlice, selectInit } from "./steps"
import TContent from "./TContent";

interface TWholeProps extends TableProps {

}

const TWhole: React.FC<TWholeProps> = (props) => {
    const {
        columns,
        rowSelection,
        dataSource,
        maxRows = 10,
    } = props

    const prefixCls = 'romantic-table';

    const checkAll = useRef<HTMLInputElement | null>(null) // 全选的节点

    const [pageNum, setPageNum] = useState<number>(0) // 页数
    const [chosedRowsData, setChosedRowsData] = useState<Array<any>>([])

    // 数据的初始化
    const [newDataSource, setNewDataSource] = useState(() => {
        const fns = [dataSlice]
        rowSelection && fns.push(selectInit)
        return combinationFuns(fns)(dataSource, maxRows)
    })

    // pageNum改变，全选状态改变
    useEffect(() => {
        if (checkAll.current) {
            const checkAllBox = checkAll.current as HTMLInputElement;

            if (getCurrentPageunChecked() === newDataSource[pageNum].length) {
                checkAllBox.checked = false
            } else {
                checkAllBox.checked = true
            }
        }
    }, [pageNum])

    // 获取已经选中的个数
    const getCurrentPageunChecked = () => {
        return (newDataSource[pageNum] as Object[]).filter((val: any) => val.checked === false).length
    }

    // 全选和取消全选的处理
    const handleCheckAllClick = (e: any) => {
        const checkAllBox = checkAll.current as HTMLInputElement;
        const checkedNum = getCurrentPageunChecked() // 未选中的个数
        // 全选
        if (checkedNum !== 0 && checkedNum <= newDataSource[pageNum].length) {
            checkAllBox.checked = true;
            setNewDataSource((preData: any) => {
                return selectAllDetail(preData, true)
            })
            setChosedRowsData((preData: any) => {
                let temp = [...preData];
                temp[pageNum] = newDataSource[pageNum].map((val: any) => val.key) // 存储key
                return temp
            })

        } else {  // 取消全选
            checkAllBox.checked = false;
            setNewDataSource((preData: any) => {
                return selectAllDetail(preData, false)
            })

            setChosedRowsData((preData: any) => {
                let temp = [...preData];
                temp[pageNum] = [];
                return temp
            })
        }
    }

    // 全选的详细处理
    const selectAllDetail = (data: any, status: boolean) => {
        let temp = [...data]
        const modifyData = temp[pageNum].map((val: any) => ({
            ...val,
            checked: status
        }))
        temp[pageNum] = modifyData
        return temp
    }

    // 选框的响应
    const responseCheck = (index: number, rowData: any, status: boolean) => {
        const checkAllBox = checkAll.current as HTMLInputElement;
        // 判断全选状态是否需要修改
        if (status === false) {
            checkAllBox.checked === true && (checkAllBox.checked = false)
        } else {
            getCurrentPageunChecked() - 1 === 0 && (checkAllBox.checked = true)
        }

        // 更新选中状态
        setNewDataSource((pre: any) => {
            const temp = [...pre];
            temp[pageNum][index].checked = status;
            return temp
        })

        // 更新选中数据
        setChosedRowsData((pre: any) => {
            let temp = [...pre];
            if (status) {
                temp[pageNum] ? temp[pageNum].push(rowData.key) : temp[pageNum] = [rowData.key]
                return temp
            }
            temp[pageNum] = temp[pageNum].filter((val: any) => val !== rowData.key)
            return temp

        })

    }

    return (
        <>
            {/* 表头 */}
            <thead className={`${prefixCls}-thead`}>
                <tr>
                    {/* 多选或单选 */}
                    {
                        rowSelection ? (rowSelection.type === 'checkbox' ?
                            <th className={`${prefixCls}-cell ${prefixCls}-selection-column`}>
                                <div className={`${prefixCls}-selection`}>
                                    <label>
                                        <input type="checkbox" className={`${prefixCls}-selection-select`} ref={checkAll} onClick={handleCheckAllClick} />
                                    </label>
                                </div>
                            </th>
                            :
                            <td className={`${prefixCls}-cell ${prefixCls}-selection-column`}></td>
                        ) : null
                    }
                    {
                        columns.map((val) => {
                            return (
                                <th key={val.title} className={`${prefixCls}-cell`}>{val.title}</th>
                            )
                        })
                    }
                </tr>
            </thead>
            {/* 表单内容 */}
            <TContent dataSource={newDataSource[pageNum]} columns={columns} rowSelection={rowSelection} responseCheck={responseCheck}></TContent>
        </>
    )
}

export default TWhole;