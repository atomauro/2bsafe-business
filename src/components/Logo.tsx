import React from 'react';

interface ILogoProps {
  draggable: boolean,  
}

const Logo = (props: ILogoProps) => {
  return <img alt="Logo" src="/static/logo-slogan-smartfit.png" style={{objectFit: 'contain'}} {...props} />;
};

export default Logo;
