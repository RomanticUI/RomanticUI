---
nav: Hook
mobile: false
toc: content
---

# useLatest

useLatest：永远返回最新的值，可以避免闭包问题。

> 从作用来看，这个钩子返回的永远是最新值，也就是说，这个钩子的入参与出参都是这个值，但这个值我们却不知道是 string、number 还是其他类型的值，这时，我们就希望它传入的值与返回的值是同种类型。简单来说，无论传入什么类型，都要返回对应的类型，这种情况必是泛型。 :{readonly current: T} 代表返回结果的类型，由于我们使用的为 useRef ，所以，返回的值都在 current 内，那么 current 的类型就是 T。至于 readonly 则是代表的只读不可修改，因为固定模式为 current 对象，所以这里使用 readonly 。

## 代码演示

```tsx
import { useEffect, useState } from 'react'
import { useLatest } from 'RomanticUI'
export default () => {
  const [count, setCount] = useState(0)
  const ref = useLatest(count)
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('count:', count)
      console.log('ref:', ref)
      setCount(ref.current + 1)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div>自定义Hooks：useLatestt</div>
      <div>count: {count}</div>
    </>
  )
}
```

> useLatest:0 count: 0； ref: {current: 0} <br/> useLatest: 1 count: 0 ref: {current: 1} <br/> useLatest: 2 count: 0 ref: {current: 2} <br/> useLatest: 3 count: 0 ref: {current: 3} <br/> useLatest: 4 count: 0 ref: {current: 4} <br/> useLatest: 5 count: 0 ref: {current: 5} <br/> useLatest: 6 count: 0 ref: {current: 6}

我们通过打印的数据可以看出：`useEffect`因为依赖数组中没有`count`，所以`useEffect`内部中`count`一直保持着初始值，而`useLatest`每次获取到的`count`都是最新的值，这就解决了闭包的问题
