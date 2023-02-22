---
nav: 组件
group: 数据展示
mobile: false
toc: content
---

# Avatar

用来代表用户或事物，支持图片展示。

## 代码演示

### circle

```tsx
import { Avatar } from 'RomanticUI';

export default () => (
  <Avatar
    shape="circle"
    size="40px"
    AvatarImg="https://avatars.githubusercontent.com/u/111177624?v=4"
  ></Avatar>
);
```

```tsx
import { Avatar } from 'RomanticUI';

export default () => (
  <Avatar
    shape="circle"
    AvatarImg="https://avatars.githubusercontent.com/u/111177624?v=4"
    size="60px"
  ></Avatar>
);
```

```tsx
import { Avatar } from 'RomanticUI';

export default () => (
  <Avatar
    shape="circle"
    AvatarImg="https://avatars.githubusercontent.com/u/111177624?v=4"
    size="80px"
  ></Avatar>
);
```

### square

```tsx
import { Avatar } from 'RomanticUI';

export default () => (
  <Avatar
    shape="square"
    AvatarImg="https://avatars.githubusercontent.com/u/111177624?v=4"
    size="80px"
  ></Avatar>
);
```

## API

| 属性      | 说明           | 类型            | 默认值 |
| --------- | -------------- | --------------- | ------ |
| className | --             | string          | --     |
| AvatarImg | 设置头像的值   | string          | --     |
| size      | 设置头像的大小 | number          | 40px   |
| shape     | 指定头像的形状 | circle          | square |
| children  | --             | React.ReactNode | --     |
