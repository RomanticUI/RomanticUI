---
nav: Hook
mobile: false
toc: content
---

# useLatest

> 从作用来看，这个钩子返回的永远是最新值，也就是说，这个钩子的入参与出参都是这个值，但这个值我们却不知道是 string、number 还是其他类型的值，这时，我们就希望它传入的值与返回的值是同种类型。

简单来说，无论传入什么类型，都要返回对应的类型，这种情况必是泛型。

:{readonly current: T} 代表返回结果的类型，由于我们使用的为 useRef ，所以，返回的值都在 current 内，那么 current 的类型就是 T。

至于 readonly 则是代表的只读不可修改，因为固定模式为 current 对象，所以这里使用 readonly 。

## 代码演示

## API

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
|      |      |      |        |
