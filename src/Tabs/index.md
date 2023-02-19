---
nav: 组件
group: 数据展示
mobile: false
toc: content
---

# Tabs

## 代码演示

### 基本

默认选中第一项。

```tsx
import { Tabs } from 'RomanticUI';

const onChange = (key: string) => {
  console.log(key);
};

const items = [
  {
    key: '1',
    label: `Tab 1`,
    children: `Content of Tab Pane 1`,
  },
  {
    key: '2',
    label: `Tab 2`,
    children: `Content of Tab Pane 2`,
  },
  {
    key: '3',
    label: `Tab 3`,
    children: `Content of Tab Pane 3`,
  },
];
export default () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
```

### 禁用

禁用某一项。

```tsx
import { Tabs } from 'RomanticUI';

export default () => (
  <Tabs
    defaultActiveKey="1"
    items={[
      {
        label: 'Tab 1',
        key: '1',
        children: 'Tab 1',
      },
      {
        label: 'Tab 2',
        key: '2',
        children: 'Tab 2',
        disabled: true,
      },
      {
        label: 'Tab 3',
        key: '3',
        children: 'Tab 3',
      },
    ]}
  />
);
```

### 居中

标签居中展示。

```tsx
import { Tabs } from 'RomanticUI';

export default () => (
  <Tabs
    defaultActiveKey="1"
    centered
    items={new Array(3).fill(null).map((_, i) => {
      const id = String(i + 1);
      return {
        label: `Tab ${id}`,
        key: id,
        children: `Content of Tab Pane ${id}`,
      };
    })}
  />
);
```

### 图标

### 滑动

```tsx
import { Tabs } from 'RomanticUI';

export default () => (
  <Tabs
    defaultActiveKey="1"
    tabPosition={'top'}
    style={{ height: 220 }}
    items={new Array(30).fill(null).map((_, i) => {
      const id = String(i);
      return {
        label: `Tab-${id}`,
        key: id,
        disabled: i === 28,
        children: `Content of tab ${id}`,
      };
    })}
  />
);
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
|      |      |      |        |
