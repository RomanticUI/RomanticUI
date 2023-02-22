---
nav: 组件
group: 导航
mobile: false
toc: content
---

# Menu

## 代码演示

```tsx
import { AllItems, Menu } from 'RomanticUI';
const item: AllItems = [
  {
    label: 'Navigation One',
    optionKey: 'mail',
  },
  {
    label: 'Navigation Two',
    optionKey: 'app',
  },
  {
    label: 'Navigation Three - Submenu-kkkkkkk',
    optionKey: 'SubMenu',
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            optionKey: 'setting:1',
          },
          {
            label: 'Option 2',
            optionKey: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            optionKey: 'setting:3',
          },
          {
            label: 'Option 4',
            optionKey: 'setting:4',
          },
        ],
      },
    ],
  },
  {
    label: 'alipay',
    optionKey: 'alipay',
  },
];
export default () => (
  <div>
    <Menu items={item}></Menu>
  </div>
);
```

## API

| 属性  | 说明           | 类型     | 默认值 |
| ----- | -------------- | -------- | ------ |
| items | 设置 Menu 内容 | AllItems | null   |
