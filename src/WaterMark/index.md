---
nav: 组件
group: 其他
mobile: false
toc: content
---

# WaterMark

## 代码演示

```tsx
import { Watermark } from 'RomanticUI';

export default () => (
  <Watermark content="RomanticUI">
    <div style={{ height: 500 }} />
  </Watermark>
);
```

```tsx
import { Watermark } from 'RomanticUI';

export default () => (
  <Watermark content={['romanticUI', 'romanticUI']}>
    <div style={{ height: 500 }} />
  </Watermark>
);
```

```tsx
import { Watermark } from 'RomanticUI';

export default () => (
  <Watermark height={30} width={130} image="https://xubh.top/lofo-xu.svg">
    <div style={{ height: 500 }} />
  </Watermark>
);
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
|      |      |      |        |

## API

### Watermark

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | 水印的宽度，`content` 的默认值为自身的宽度 | `number` | 120 |
| height | 水印的高度，`content` 的默认值为自身的高度 | `number` | 64 |
| rotate | 水印绘制时，旋转的角度，单位 `°` | `number` | -22 |
| zIndex | 追加的水印元素的 z-index | `number` | 9 |
| image | 图片源 | `string` | - |
| content | 水印文字内容 | `string` \| `string[]` | - |
| font | 文字样式 | [Font](#font) | [Font](#font) |
| gap | 水印之间的间距 | `[number, number]` | \[100, 100\] |
| offset | 水印距离容器左上角的偏移量，默认为 `gap/2` | `[number, number]` | \[gap\[0\]/2, gap\[1\]/2\] |

### Font

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| color | 字体颜色 | `string` | rgba(0,0,0,.15) |  |
| fontSize | 字体大小 | `number` | 16 |  |
| fontWeight | 字体粗细 | `normal` \| `light` \| `weight` \| `number` | normal |  |
| fontFamily | 字体类型 | string | sans-serif |  |
| fontStyle | 字体样式 | `none` \| `normal` \| `italic` \| `oblique` | normal |  |
