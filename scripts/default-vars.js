const fs = require('fs')
const path = require('path')
// const lessToJs = import('./less-var-to-js');
const lessVarToJs = require('./less-var-to-js')

// 获取到样式的文件
const stylePtah = path.join(__dirname, '../src/components/style')
// 读取颜色的样式
const colorLess = fs.readFileSync(
  path.join(stylePtah, 'color', 'daybreakBlue.less'),
  'utf-8'
) // 返回string类型

const defaultPaletteLess = lessVarToJs(colorLess, {
  resolveVariables: true,
  stripPrefix: true,
})

module.exports = defaultPaletteLess
