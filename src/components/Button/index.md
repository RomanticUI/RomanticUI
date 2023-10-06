---
nav: 组件
group: 通用
mobile: false
toc: content
---

# Button

## 代码演示

### 按钮类型

```tsx
import { Button } from 'RomanticUI';
export default () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <Button type="primary">Primary Button</Button>
      <Button>Default Button</Button>
      <Button type="dashed">Dashed Button</Button>
      <Button type="text">Text Button</Button>
    </div>
  );
};
```

> 按钮有四种类型：主按钮、次按钮、虚线按钮、文本按钮

### 不可用状态

```tsx
import { Button } from 'RomanticUI';
export default () => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <Button type="text">Text Button</Button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button type="primary" disabled>
          Primary Button
        </Button>
        <Button disabled>Default Button</Button>
        <Button type="dashed" disabled>
          Dashed Button
        </Button>
        <Button type="text" disabled>
          Text Button
        </Button>
      </div>
    </>
  );
};
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
|      |      |      |        |
