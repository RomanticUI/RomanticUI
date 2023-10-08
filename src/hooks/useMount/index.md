---
nav: Hook
mobile: false
toc: content
---

# useMount

## 代码演示

```tsx
import { useState } from 'react'
import { useMount } from 'RomanticUI'
const Child = () => {
  useMount(() => {
    alert('首次渲染')
  })
  return <div>RomanticUI，useMount测试</div>
}

const Index = () => {
  const [flag, setFlag] = useState<boolean>(false)

  return (
    <div>
      <button onClick={() => setFlag((v) => !v)}>
        切换 {flag ? 'unmount' : 'mount'}
      </button>
      {flag && <Child />}
    </div>
  )
}

export default Index
```
