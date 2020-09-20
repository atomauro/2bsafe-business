import React from 'react';

interface ILogoProps {
  draggable: boolean;
}

const Logo = (props: ILogoProps) => {
  return <img alt="Logo" src="/static/logo.png" {...props} />;
};

export default Logo;
