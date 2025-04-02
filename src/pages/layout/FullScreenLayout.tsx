import {ReactNode} from 'react';
import styles from './FullScreenLayout.module.css';

const FullScreenLayout = ({children}: {children: ReactNode}) => {
  return <div className={styles.layout}>{children}</div>;
};

export default FullScreenLayout;
