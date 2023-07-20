import { Document, ISectionOptions, Packer } from 'docx';
import { saveAs } from 'file-saver';

import { IPropertiesOptions } from 'docx/build/file/core-properties';
import React, { Children, useEffect } from 'react';

interface ExtraProps {
  children: React.ReactElement;
  docRef: React.MutableRefObject<any>;
}

export type RDocumentProps = Omit<IPropertiesOptions, 'sections'> & {
  sections?: ISectionOptions[];
};

const RDocument = (props: RDocumentProps & ExtraProps) => {
  let disposition: Omit<RDocumentProps, 'children'> & Partial<ExtraProps> = {
    ...props,
    sections: [],
  };

  useEffect(() => {
    console.log(disposition);
    let data = new Document(disposition as IPropertiesOptions);
    props.docRef.current = {
      originData: data,
      downLoad: () => {
        Packer.toBlob(data).then((blob) => saveAs(blob, 'example.docx'));
      },
    };
  }, []);

  let { sections } = disposition;

  let cns = Children.map(props.children, (child, index) => {
    if (sections) {
      sections[index] = { children: [] };
      return React.cloneElement(child, { disposition: sections[index] });
    }
    return null;
  });

  // 去除无关配置
  delete disposition.children;
  delete disposition.docRef;

  return cns;
};

export default RDocument;
