const updateVarLess = require('../scripts/update-css-variable')
console.log(updateVarLess)
updateVarLess()

// 组件
export { default as Avatar } from './components/Avatar'
export { default as Button } from './components/Button'
export { default as Divider } from './components/Divider'
export * as Word from './components/Docx'
export { default as Menu, type AllItems } from './components/Menu'
export { default as Pagination } from './components/Pagination'
export { default as ProgressBar } from './components/ProgressBar'
export { default as Spin } from './components/Spin'
export { default as SvgIcon } from './components/SvgIcon'
export { default as Table } from './components/Table'
export { default as Tabs } from './components/Tabs'
export { default as Watermark } from './components/WaterMark'
// hook
export { default as useLatest } from './hooks/useLatest'
export { default as useMount } from './hooks/useMount'
export { default as useSummary } from './hooks/useSummary'
export { default as useUnmount } from './hooks/useUnmount'

// 对外暴露的配置
