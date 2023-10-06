---
nav: Hook
mobile: false
toc: content
---

# useSummary

## 代码演示

```tsx
import { ProTable } from '@ant-design/pro-components';
import { useSummary } from 'RomanticUI';
export default () => {
  const [setSelfData, RenderSummary] = useSummary({
    config: [
      [
        { colSpan: 1, content: '总和' },
        { colSpan: 1, content: '平均值' },
        { colSpan: 1, content: '总和与平均值的差值' },
      ],
      [
        { colSpan: 1, computed: (pre, cur) => pre + cur['containers'] },
        {
          colSpan: 1,
          computed: (pre, cur, currentIndex, arr) => pre + cur['containers'] / arr.length,
          renderText: (val) => Math.floor(val),
        },
        { colSpan: 2, renderText: (val, row) => row[0] - row[1] },
      ],
    ],
  });
  const tableListDataSource = [];
  for (let i = 0; i < 5; i += 1) {
    tableListDataSource.push({
      key: i,
      name: 'AppName',
      containers: Math.floor(Math.random() * 20),
      creator: 1,
      status: 'Processing',
      createdAt: Date.now() - Math.floor(Math.random() * 100000),
      memo: i % 2 === 1 ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴' : '简短备注文案',
    });
  }
  const columns = [
    {
      title: '应用名称',
      width: 80,
      dataIndex: 'name',
      render: (_) => <a>{_}</a>,
    },
    {
      title: '容器数量',
      dataIndex: 'containers',
      align: 'right',
      sorter: (a, b) => a.containers - b.containers,
    },
    {
      title: '状态',
      width: 80,
      dataIndex: 'status',
      initialValue: 'all',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        close: { text: '关闭', status: 'Default' },
        running: { text: '运行中', status: 'Processing' },
        online: { text: '已上线', status: 'Success' },
        error: { text: '异常', status: 'Error' },
      },
    },
    {
      title: '创建时间',
      tooltip: '这是一段描述',
      width: 140,
      key: 'since',
      hideInSearch: true,
      dataIndex: 'createdAt',
      valueType: 'date',
      sorter: (a, b) => a.createdAt - b.createdAt,
    },
  ];
  return (
    <ProTable
      columns={columns}
      onDataSourceChange={(dataSource) => {
        console.log('dataSource', dataSource);
        setSelfData(dataSource);
      }}
      rowKey="key"
      summary={(currentData) => {
        console.log(currentData);
        return <RenderSummary key={Math.random()} />;
      }}
      request={(params, sorter, filter) => {
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
        });
      }}
    />
  );
};
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
|      |      |      |        |
