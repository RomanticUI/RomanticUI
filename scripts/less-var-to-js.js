// 将less变量转化为js对象
const stripComments = require('./strip-json-comments')
const varRgx = /^[@$]/

const followar = (value, lessVars, dictionary) => {
  if (varRgx.test(value)) {
    // 如果value符合要求
    return followar(lessVars[value] || dictionary[value.replace(varRgx, '')])
  }
  return value
}

module.exports = (sheet, options = {}) => {
  const {
    dictionary = {},
    resolveVariables = false,
    stripPrefix = false,
  } = options
  let lessVars = {}
  // stripComments去除注释影响
  const matches = stripComments(sheet).match(/[@$](.*:[^;]*)/g) || []

  matches.forEach((variable) => {
    const definition = variable.split(/:\s*/)
    let value = definition.splice(1).join(':')
    value = value.trim().replace(/^["'](.*)["']$/, '$1')
    lessVars[definition[0].replace(/['"]+/g, '').trim()] = value
  })

  if (resolveVariables) {
    Object.keys(lessVars).forEach((key) => {
      const value = lessVars[key]
      lessVars[key] = followar(value, lessVars, dictionary)
    })
  }

  if (stripPrefix) {
    const transformKey = (key) => key.replace(varRgx, '')
    lessVars = Object.keys(lessVars).reduce((pre, key) => {
      pre[transformKey(key)] = lessVars[key]
      return pre
    }, {})
  }
  return lessVars
}
