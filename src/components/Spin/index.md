---
nav: 组件
group: 反馈
mobile: false
toc: content
---

# Spin

## 代码演示

### loding

```tsx
import { Spin } from 'RomanticUI';

export default () => <Spin type="loading"></Spin>;
```

### loding1-修改 style

```tsx
import { Spin } from 'RomanticUI';

export default () => <Spin type="loading1" style={{ width: 50, height: 50 }}></Spin>;
```

### loding1

```tsx
import { Spin } from 'RomanticUI';

export default () => <Spin type="loading1"></Spin>;
```

### loding2

```tsx
import { Spin } from 'RomanticUI';

export default () => <Spin type="loading2"></Spin>;
```

### loding3

```tsx
import { Spin } from 'RomanticUI';

export default () => <Spin type="loading3"></Spin>;
```

### loding4

```tsx
import { Spin } from 'RomanticUI';

export default () => <Spin type="loading4"></Spin>;
```

## API

| 属性  | 说明       | 类型                                                            | 默认值 |
| ----- | ---------- | --------------------------------------------------------------- | ------ |
| type  | 不同的样式 | `loading` \| `loading1` \| `loading2`\|`loading3`\|`loading4`\| |
| style | 自定义样式 | `CSSProperties`                                                 | --     |
| ref   | --         | `Ref<HTMLDivElement>`                                           | --     |
