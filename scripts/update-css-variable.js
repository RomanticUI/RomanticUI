module.exports = () => {
  const fs = require('fs')
  const path = require('path')
  // 获取到指定文件的内容
  const configFilePath = path.join(process.cwd(), '.romantic.json')

  try {
    const configContent = fs.readFileSync(configFilePath, 'utf-8')
    const jsonObject = JSON.parse(configContent)
    // Object.keys(jsonObject).forEach((styleItemKey) => {
    //   document.documentElement.setAttribute(
    //     styleItemKey,
    //     jsonObject[styleItemKey]
    //   )
    // })
    console.log(jsonObject)
  } catch (error) {
    // ....do nothing
  }
}
