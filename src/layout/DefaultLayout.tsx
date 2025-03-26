import styles from './DefaultLayout.module.css';
import {Link} from 'react-router-dom';
import {ReactNode} from 'react';

const DefaultLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1>헤더 영역</h1>
      </header>

      <nav className={styles.topMenu}>
        <ul className={styles.topMenuList}>
          <li className={styles.topMenuItem}>
            <Link to="#">탑 메뉴 1</Link>
          </li>
          <li className={styles.topMenuItem}>
            <Link to="#">탑 메뉴 2</Link>
          </li>
          <li className={styles.topMenuItem}>
            <Link to="#">탑 메뉴 3</Link>
          </li>
        </ul>
      </nav>

      <div className={styles.mainContainer}>
        <aside className={styles.sidebar}>
          <nav>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <Link to="#" className={styles.navLink}>
                  사이드 메뉴 1
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link to="#" className={styles.navLink}>
                  사이드 메뉴 2
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main className={styles.mainContent}>{children}</main>
      </div>

      <footer className={styles.footer}>
        <p>푸터 영역</p>
      </footer>
    </div>
  );
};

export default DefaultLayout;
