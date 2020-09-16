import React from 'react';

interface LogoProps {
  draggable: boolean;
  
}

const Logo = (props: LogoProps) => {
  return <img alt="Logo" src="/static/logo.png" {...props} />;
};

export default Logo;
