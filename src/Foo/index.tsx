import React from 'react';

type FooProps = {
  title: string;
};

const Foo = ({ title }: FooProps): JSX.Element => <h1>{title}</h1>;

export default Foo;
