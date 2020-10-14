import React, { forwardRef } from 'react';
import { Helmet } from 'react-helmet';

const Page = forwardRef(({
  children,
  title = '',
  className,
  ref,
  ...rest
}: {children: any, title:string, ref:any, className:any})  => {
  return (
    <div
      ref={ref}
      {...rest}
    >
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
});

export default Page;
