---
nav: 组件
group: 通用
mobile: false
toc: content
---

# ProgressBar

## 代码演示

## ProgressBar

### 常规:

```tsx
import React from 'react';
import { ProgressBar } from 'RomanticUI';

export default () => (
  <div>
    <ProgressBar percent={20} color={'lightblue'} showInfo={true} />

    <ProgressBar percent={40} color={'green'} showInfo={true} />

    <ProgressBar percent={80} color={'red'} showInfo={true} />
  </div>
);
```

### 小型进度条:

```tsx
import React from 'react';
import { ProgressBar } from 'RomanticUI';

export default () => (
  <div>
    <ProgressBar isSmall={true} percent={20} color={'lightblue'} showInfo={true} />

    <ProgressBar isSmall={true} percent={40} color={'green'} showInfo={true} />

    <ProgressBar isSmall={true} percent={80} color={'red'} showInfo={true} />
  </div>
);
```

### 圆形进度条:

```tsx
import React from 'react';
import { ProgressBar } from 'RomanticUI';

export default () => (
  <div>
    <p>
      <ProgressBar isCircle={true} percent={20} color={'lightblue'} showInfo={true} />
    </p>
    <p>
      <ProgressBar isCircle={true} percent={40} color={'lightblue'} showInfo={true} />
    </p>
    <p>
      <ProgressBar isCircle={true} percent={50} color={'lightblue'} showInfo={true} />
    </p>
  </div>
);
```

### 动态进度条:

```tsx
import React, { useState } from 'react';
import { ProgressBar } from 'RomanticUI';
export default () => {
  const [percent, setPercent] = useState(20);
  const increase = () => {
    setPercent((prevPercent) => {
      const newPercent = prevPercent + 10;
      if (newPercent > 100) {
        return 100;
      }
      return newPercent;
    });
  };
  const decline = () => {
    setPercent((prevPercent) => {
      const newPercent = prevPercent - 10;
      if (newPercent < 0) {
        return 0;
      }
      return newPercent;
    });
  };
  return (
    <div>
      <button onClick={increase}>+</button>
      <button onClick={decline}>-</button>
      <ProgressBar percent={percent} color={'lightblue'} showInfo={true} />
    </div>
  );
};
```

## API

| 属性     | 说明             | 类型    | 默认值 |
| -------- | ---------------- | ------- | ------ |
| percent  | 当前的进度       | int     | 0      |
| showinfo | 是否显示进度信息 | boolean | false  |
| color    | 颜色             | string  | -      |
| isSmall  | 是否短进度条     | boolean | false  |
| isCircle | 是否圆形         | boolean | false  |
