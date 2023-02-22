---
nav: 组件
group: 通用
mobile: false
toc: content
---

# Divider

## 代码演示

## API

| 属性    | 说明      | 类型    | 默认值 |
| ------- | --------- | ------- | ------ |
| dashed  | 虚线/实现 | boolean | false  |
| content | 文字      | string  | -      |

## Divider

虚线:

```tsx
import React from 'react';
import { Divider } from 'RomanticUI';

export default () => <Divider content={'text'} dashed={true} />;
```

实线:

```tsx
import React from 'react';
import { Divider } from 'RomanticUI';

export default () => <Divider content={''} dashed={false} />;
```
