import React from 'react';

interface ILogoProps {
  draggable: boolean,  
}

const Logo = (props: ILogoProps) => {
  return <img alt="Logo" src="/static/logo-slogan-smartfit.png" style={{height:60, marginTop:5, marginBottom:3}} {...props} />;
};

export default Logo;
