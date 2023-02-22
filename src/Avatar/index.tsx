import React from 'react';
import './style/index.module.less';

export interface AvatarProps {
  shape?: 'circle' | 'square';
  size?: 'large' | 'small' | 'default';
  src?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  AvatarImg?: string;
}

const Avatar: React.FC<AvatarProps> = (props) => {
  const { shape, size = '40px', children, className, AvatarImg } = props;

  const AvatarStyle = {
    boxSizing: 'border-box',
    width: size,
    height: size,
    margin: 0,
    padding: 0,
    listStyle: 'none',
    position: 'relative',
    display: 'inline-flex',
    overflow: 'hidden',
    background: '#ccc',
    borderRadius: shape == 'circle' ? '100%' : '20%',
  };
  console.log(shape == 'circle' ? '50%' : '98%');
  return (
    <span className={className} style={AvatarStyle}>
      {' '}
      {/* {children} */}
      <img src={AvatarImg} />
    </span>
  );
};

export default Avatar;
