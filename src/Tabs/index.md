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

### 滑动

针对滑动进行节流处理，减少性能损耗

左右滑动

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

上下滑动

```tsx
import { Tabs } from 'RomanticUI';

export default () => (
  <Tabs
    defaultActiveKey="1"
    tabPosition={'left'}
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

### 附加内容

```tsx
import { Tabs } from 'RomanticUI';

export default () => {
  const items = new Array(3).fill(null).map((_, i) => {
    const id = String(i + 1);
    return {
      label: `Tab ${id}`,
      key: id,
      children: `Content of tab ${id}`,
    };
  });
  const operations = <button>Extra Action</button>;
  const OperationsSlot = {
    left: <button>Left Extra Action</button>,
    right: <button>Right Extra Action</button>,
  };
  return (
    <>
      <Tabs tabBarExtraContent={operations} items={items} />
      <br />
      <br />
      <div>You can also specify its direction or both side</div>
      <br />
      <br />
      <Tabs tabBarExtraContent={OperationsSlot} items={items} />
    </>
  );
};
```

### 大小

```tsx
import { useState } from 'react';
import { Tabs } from 'RomanticUI';

export default () => {
  const [size, setSize] = useState('small');
  const handleClick = (e) => {
    setSize(e.target.defaultValue);
  };
  return (
    <>
      <input type="button" value="small" onClick={handleClick}></input>
      <input type="button" value="middle" onClick={handleClick}></input>
      <input type="button" value="large" onClick={handleClick}></input>
      <Tabs
        defaultActiveKey="1"
        size={size}
        style={{ marginBottom: 32 }}
        items={new Array(3).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label: `Tab ${id}`,
            key: id,
            children: `Content of tab ${id}`,
          };
        })}
      />
    </>
  );
};
```

### 位置

```tsx
import { useState } from 'react';
import { Tabs } from 'RomanticUI';

type TabPosition = 'left' | 'right' | 'top' | 'bottom';

export default () => {
  const [tabPosition, setTabPosition] = useState('left');
  const changeTabPosition = (e: RadioChangeEvent) => {
    setTabPosition(e.target.value);
  };
  return (
    <>
      <input type="button" value="top" onClick={changeTabPosition}></input>
      <input type="button" value="bottom" onClick={changeTabPosition}></input>
      <input type="button" value="left" onClick={changeTabPosition}></input>
      <input type="button" value="right" onClick={changeTabPosition}></input>
      <Tabs
        tabPosition={tabPosition}
        items={new Array(3).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label: `Tab ${id}`,
            key: id,
            children: `Content of Tab ${id}`,
          };
        })}
      />
    </>
  );
};
```

### 卡片式标签

```tsx
import { Tabs } from 'RomanticUI';

export default () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <Tabs
      onChange={onChange}
      type="card"
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
};
```

## API

### Tabs

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| activeKey | 当前激活面板的 key | string | - |
| centered | 标签居中 | boolean | false |
| defaultActiveKey | 初始化选择面板的 key，如果没有设置 activeKey | string | 第一个面板 |
| items | 配置选项内容 | TabItemType | [] |
| size | 大小，提供 large middle 和 small 三种大小 | string | middle |
| tabBarExtraContent | tab bar 上额外的元素 | ReactNode \| {left?: ReactNode, right?: ReactNode} | - |
| tabPosition | 页签位置，可选值有 top right bottom left | string | top |
| type | 页签的基本样式，可选 line、card | string | line |
| onTabClick | tab 被点击的回调 | function(key: string, event: MouseEvent) | - |
| onChange | 切换面板的回调 | function(activeKey) {} | - |

### TabItemType

| 属性     | 说明             | 类型      | 默认值 |
| -------- | ---------------- | --------- | ------ |
| disabled | 禁用某一项       | boolean   | false  |
| key      | 对应             | activeKey | string |
| label    | 选项卡头显示文字 | ReactNode | -      |
| children | 选项卡头显示内容 | ReactNode | -      |
