---
nav: 组件
group: 数据展示
mobile: false
toc: content
---

# Table

## 代码演示

### 基本用法

```tsx
import { Table } from 'RomanticUI';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export default () => <Table columns={columns} dataSource={data}></Table>;
```

### 自定义 render 列

```tsx
import { Table } from 'RomanticUI';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a style={{ color: 'red' }}>{text}</a>,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export default () => <Table columns={columns} dataSource={data}></Table>;
```

### 大小

```tsx
import { useState } from 'react';
import { Table } from 'RomanticUI';

export default () => {
  const [size, setSize] = useState('small');
  const handleClick = (e) => {
    setSize(e.target.defaultValue);
  };

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  return (
    <>
      <input type="button" value="small" onClick={handleClick}></input>
      <input type="button" value="middle" onClick={handleClick}></input>
      <input type="button" value="large" onClick={handleClick}></input>
      <Table columns={columns} dataSource={data} size={size}></Table>
    </>
  );
};
```

### 是否携带外边框和列边框

```tsx
import { useState } from 'react';
import { Table } from 'RomanticUI';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
];

export default () => {
  const [bordered, setBordered] = useState(false);
  const handleClick = () => {
    setBordered(!bordered);
  };
  return (
    <>
      <input type="button" value="变化" onClick={handleClick}></input>
      <br />
      <span>
        当前状态 <strong>{bordered ? '携带外边框和列边框' : '不携带外边框和列边框'}</strong>
      </span>
      <Table columns={columns} dataSource={data} bordered={bordered}></Table>
    </>
  );
};
```

### 内容对齐

```tsx
import { useState } from 'react';
import { Table } from 'RomanticUI';

export default () => {
  const [align, setAlign] = useState('center');
  const handleClick = (e) => {
    setAlign(e.target.defaultValue);
  };

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  return (
    <>
      <input type="button" value="left" onClick={handleClick}></input>
      <input type="button" value="center" onClick={handleClick}></input>
      <input type="button" value="right" onClick={handleClick}></input>
      <Table columns={columns} dataSource={data} align={align}></Table>
    </>
  );
};
```

### 选择和操作

```tsx
import { useState } from 'react';
import { Table } from 'RomanticUI';
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];

const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
  data.push({ key: i, name: `Edward King ${i}`, age: 32, address: `London, Park Lane no. ${i}` });
}

export default () => {
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={{
          type: selectionType,
        }}
      ></Table>
    </>
  );
};
```

### 排序

```tsx
import { useState } from 'react';
import { Table } from 'RomanticUI';
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    sortDirections: ['ascend', 'descend'],
    sortOrder: 'descend',
    sorter: false,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 34,
    address: 'Sydney No. 1 Lake Park',
  },
];

export default () => {
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={{
          type: selectionType,
        }}
      ></Table>
    </>
  );
};
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
|      |      |      |        |
