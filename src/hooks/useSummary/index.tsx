import { Table } from "antd"
import React, { useState } from "react"

interface ConfigParams {
    colSpan: number,
    content?: string,
    computed?: (previousValue: any, currentValue: any, currentIndex: number, array: any[]) => any,
    renderText?: (val: number | string, row: any[]) => JSX.Element
}

const useSummary = (
    {
        render,
        config
    }:
        {
            render?: (dataSource: any[], renderConfig: Array<ConfigParams> | Array<ConfigParams[]>) => JSX.Element,
            config?: Array<ConfigParams> | Array<ConfigParams[]>
        }
) => {
    let [selfData, setSelfData] = useState<any[]>([])
    let renderComponent = render
    let renderConfig = config || []

    if (renderComponent === undefined && renderConfig) {
        renderComponent = function () {
            return (
                <Table.Summary>
                    {
                        Array.isArray(renderConfig[0]) ?
                            selfData.map((item, index) => (
                                <Table.Summary.Row>
                                    {
                                        item.map((innerItem: string | number, innerIndex: number) => {
                                            let currentConfig = (renderConfig[index] as ConfigParams[])[innerIndex]
                                            return <Table.Summary.Cell index={innerIndex} colSpan={currentConfig.colSpan}>
                                                {currentConfig?.renderText ? currentConfig?.renderText(innerItem, item) : innerItem}
                                            </Table.Summary.Cell>
                                        })
                                    }
                                </Table.Summary.Row>
                            ))
                            :
                            <Table.Summary.Row>
                                {
                                    selfData.map((item, index) => {
                                        let currentConfig = renderConfig[index] as ConfigParams
                                        return <Table.Summary.Cell index={index} colSpan={currentConfig.colSpan} >
                                            {currentConfig?.renderText ? currentConfig?.renderText(item, selfData) : item}
                                        </Table.Summary.Cell>
                                    })
                                }
                            </Table.Summary.Row>
                    }

                </Table.Summary>
            )
        }
    } else {
        console.error("使用默认的总结组件，必须传config参数")
    }

    const updateSelfData = (dataSource: any[]) => {
        let temp = renderConfig?.map(item => {
            if (Array.isArray(item)) {
                return item.map(innerItem => {
                    return innerItem.computed ?
                        dataSource.reduce(innerItem.computed, 0)
                        :
                        (innerItem.content || "")
                })
            } else {
                return item.computed ?
                    dataSource.reduce(item.computed, 0)
                    :
                    (item.content || "")
            }
        })
        console.log(temp)
        setSelfData(temp || [])
    }

    const RenderSummary = () => {

        return renderComponent ?
            renderComponent(selfData, renderConfig) :
            null
    }

    return [
        updateSelfData,
        RenderSummary
    ]
}

export default useSummary