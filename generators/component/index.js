// 验证组件是否已经存在
// const componentExist = require('../utils/index.js');
const path = require('path');

module.exports = {
  description: '创建组件',
  prompts: [
    {
      type: 'input',
      name: 'dir',
      message: '请输入 component 文件夹名称!',
      // validate: (value) => {
      //     if (/.+/.test(value)) {
      //         return componentExist(value) ? '组件名已经存在' : true;
      //     }
      //     return '请输入 component 文件夹名称';
      // },
    },
  ],
  actions: (data) => {
    const { dir } = data;
    const actions = [];

    // 组件入门文件
    actions.push({
      type: 'add',
      path: 'src/{{properCase dir}}/index.tsx',
      templateFile: 'generators/component/component.hbs',
    });

    // 样式文件
    actions.push({
      type: 'add',
      path: 'src/{{properCase dir}}/style/index.module.less',
      templateFile: 'generators/component/component.less.hbs',
    });

    // 测试文件
    actions.push({
      type: 'add',
      path: 'src/{{properCase dir}}/__test__/index.test.ts',
      templateFile: 'generators/component/component.test.hbs',
    });

    // 文档文件
    actions.push({
      type: 'add',
      path: 'src/{{properCase dir}}/index.md',
      templateFile: 'generators/component/component.md.hbs',
    });
    return actions;
  },
};
