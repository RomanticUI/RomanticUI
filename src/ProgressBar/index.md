---
nav: 组件
group: 通用
mobile: false
toc: content
---

# ProgressBar

## 代码演示

## API

| 属性  | 说明       | 类型   | 默认值 |
| ----- | ---------- | ------ | ------ |
| step  | 当前的进度 | int    | 0      |
| total | 总进度     | int    | -      |
| color | 颜色       | string | -      |

## ProgressBar

Demo:

```tsx
import React from 'react';
import { ProgressBar } from 'RomanticUI';

export default () => (
  <div>
    <ProgressBar step={50} color={'lightblue'} total={100} showInfo={true} />

    <ProgressBar step={70} color={'green'} total={100} showInfo={true} />

    <ProgressBar step={80} color={'red'} total={100} showInfo={true} />
  </div>
);
```
