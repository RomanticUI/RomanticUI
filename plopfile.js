// 执行npm run plop 默认将该文件作为执行入口

const { componentGenerator } = require('./generators/index.js');

module.exports = (plop) => {
  plop.setGenerator('创建组件', componentGenerator);
};
