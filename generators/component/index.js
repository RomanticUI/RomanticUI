// 验证组件是否已经存在
// const componentExist = require('../utils/index.js');
const path = require('path');

module.exports = {
  description: '创建组件',
  prompts: [
    {
      type: 'input',
      name: 'dir',
      message: '请输入 component 文件夹名称:',
    },
    {
      type: 'list',
      name: 'group',
      message: '请输入组件类别：',
      choices: () => {
        return ['通用', '布局', '导航', '数据录入', '数据展示', '反馈', '其他'].map((type) => ({
          name: type,
          value: type,
          checked: true,
        }));
      },
    },
  ],
  actions: (data) => {
    const { dir, group } = data;
    const actions = [];

    // 组件入门文件
    actions.push({
      type: 'add',
      path: 'src/components/{{properCase dir}}/index.tsx',
      templateFile: 'generators/component/component.hbs',
    });

    // 样式文件
    actions.push({
      type: 'add',
      path: 'src/components/{{properCase dir}}/style/index.less',
      templateFile: 'generators/component/component.less.hbs',
    });

    // 测试文件
    actions.push({
      type: 'add',
      path: 'src/components/{{properCase dir}}/__test__/index.test.ts',
      templateFile: 'generators/component/component.test.hbs',
    });

    // 文档文件
    actions.push({
      type: 'add',
      path: 'src/components/{{properCase dir}}/index.md',
      templateFile: 'generators/component/component.md.hbs',
    });
    return actions;
  },
};
