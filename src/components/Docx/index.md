---
nav: 组件
group: 文档
mobile: false
toc: content
---

## Docx

```tsx
import { UnderlineType } from 'docx';
import { useEffect, useRef } from 'react';
import { Word } from 'RomanticUI';
export default () => {
  useEffect(() => {
    console.log(docRef.current);
    // Packer.toBlob(docRef.current).then((blob) => saveAs(blob, 'example.docx'));
  }, []);
  const docRef = useRef();
  return (
    <>
      <button
        onClick={() => {
          docRef.current.downLoad();
        }}
      >
        下载
      </button>
      <Word.RDocument docRef={docRef} creator={'黄宣铭'} description={'描述'}>
        <Word.RSection properties={{ type: 1 }}>
          <Word.RParagraph>
            Note: The lineRule property has different values depending on the version of Word you
            are using. The EXACTLY value is only available in Word 2016 and above. Use EXACT for
            greater support, including LibreOffice etc. Read this issue for more information
          </Word.RParagraph>

          <Word.RParagraph>
            <Word.RText
              bold={true}
              italics={true}
              underline={{ type: UnderlineType.DOUBLE, color: '990011' }}
            >
              RText组件
            </Word.RText>
          </Word.RParagraph>
        </Word.RSection>
      </Word.RDocument>
    </>
  );
};
```
