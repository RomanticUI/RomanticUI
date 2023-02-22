---
nav: 组件
group: 导航
mobile: false
toc: content
---

# Menu

## 代码演示

### 基本

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
    children: [
      {
        label: 'Option 1',
        optionKey: 'setting:1',
      },
      {
        label: 'Option 2',
        optionKey: 'setting:2',
      },
      {
        label: 'Option 3',
        optionKey: 'setting:3',
      },
    ],
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
            label: 'Option 4',
            optionKey: 'setting:4',
          },
          {
            label: 'Option 5',
            optionKey: 'setting:5',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 6',
            optionKey: 'setting:6',
          },
          {
            label: 'Option 7',
            optionKey: 'setting:7',
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

### 主题

有 light 和 night 主题，默认 light

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
    children: [
      {
        label: 'Option 1',
        optionKey: 'setting:1',
      },
      {
        label: 'Option 2',
        optionKey: 'setting:2',
      },
      {
        label: 'Option 3',
        optionKey: 'setting:3',
      },
    ],
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
            label: 'Option 4',
            optionKey: 'setting:4',
          },
          {
            label: 'Option 5',
            optionKey: 'setting:5',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 6',
            optionKey: 'setting:6',
          },
          {
            label: 'Option 7',
            optionKey: 'setting:7',
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
    <Menu items={item} theme="night"></Menu>
  </div>
);
```

### 禁用某项

在属性 Items 中设置 `disable:true` 可将该项导航禁用（默认为 true 不禁用）

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
    disable: true,
    children: [
      {
        label: 'Option 1',
        optionKey: 'setting:1',
      },
      {
        label: 'Option 2',
        optionKey: 'setting:2',
      },
      {
        label: 'Option 3',
        optionKey: 'setting:3',
      },
    ],
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
            label: 'Option 4',
            optionKey: 'setting:4',
          },
          {
            label: 'Option 5',
            optionKey: 'setting:5',
            disable: true,
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 6',
            optionKey: 'setting:6',
          },
          {
            label: 'Option 7',
            optionKey: 'setting:7',
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
    <Menu items={item} theme="night"></Menu>
  </div>
);
```

### Menu 模式

可设置水平或垂直菜单

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
    children: [
      {
        label: 'Option 1',
        optionKey: 'setting:1',
      },
      {
        label: 'Option 2',
        optionKey: 'setting:2',
      },
      {
        label: 'Option 3',
        optionKey: 'setting:3',
      },
    ],
  },
  {
    label: 'Navigation Three - Submenu',
    optionKey: 'SubMenu',
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 4',
            optionKey: 'setting:4',
          },
          {
            label: 'Option 5',
            optionKey: 'setting:5',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 6',
            optionKey: 'setting:6',
          },
          {
            label: 'Option 7',
            optionKey: 'setting:7',
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
    <Menu items={item} mode="vertical" theme="night"></Menu>
  </div>
);
```

## API

### Menu

| 属性  | 说明                       | 类型                       | 默认值     |
| ----- | -------------------------- | -------------------------- | ---------- |
| items | 设置 Menu 内容             | AllItems                   | null       |
| theme | 设置 Menu 主题             | "light" \| "night"         | "light"    |
| mode  | 设置 Menu 模式，水平或垂直 | "vertical" \| "horizontal" | "vertical" |

### items

| 属性      | 说明                             | 类型     | 默认值 |
| --------- | -------------------------------- | -------- | ------ |
| label     | 该项文本                         | String   | null   |
| optionKey | 该项的 id，用于交互              | string   | null   |
| type      | 该项类型：group 类型无 optionKey | string   | ""     |
| disable   | 是否禁用该项                     | boolean  | false  |
| children  | 该项的子菜单                     | AllItems | null   |
