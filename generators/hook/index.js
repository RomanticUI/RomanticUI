module.exports = {
  description: '创建Hook',
  prompts: [
    {
      type: 'input',
      name: 'dir',
      message: '请输入 hook 文件夹名称:',
    },
  ],
  actions: (data) => {
    const { dir } = data;
    const actions = [];

    // 组件入门文件
    actions.push({
      type: 'add',
      path: 'src/hooks/{{dir}}/index.tsx',
      templateFile: 'generators/hook/hook.hbs',
    });

    // 测试文件
    actions.push({
      type: 'add',
      path: 'src/hooks/{{dir}}/__test__/index.test.ts',
      templateFile: 'generators/hook/hook.test.hbs',
    });

    // 文档文件
    actions.push({
      type: 'add',
      path: 'src/hooks/{{dir}}/index.md',
      templateFile: 'generators/hook/hook.md.hbs',
    });
    return actions;
  },
};
