import {ReactNode} from 'react';

const FullScreenLayout = ({children}: {children: ReactNode}) => {
  return <div className="layout">{children}</div>;
};

export default FullScreenLayout;
