import SocialButtons from '../components/sign-in/SocialButtons.tsx';
import {Link} from 'react-router-dom';
import {useEffect} from 'react';
import FullScreenLayout from './layout/FullScreenLayout.tsx';
import {toast} from 'react-toastify';
import styles from './SignIn.module.css';

const SignIn = () => {
  useEffect(() => {
    const handleEventListener = (event: MessageEvent) => {
      // 팝업으로부터 postMessage로 전달받은 데이터 확인
      const isValidOrigin = event.origin === import.meta.env.VITE_BASE_URI;
      const isValidData = event?.data != null;
      const isReactDeveloperMessage =
        event.data?.source != null && event.data.source.includes('react-devtools');

      if (!isValidOrigin || !isValidData || isReactDeveloperMessage) {
        return;
      }

      toast(JSON.stringify(event.data));
    };

    window.addEventListener('message', handleEventListener);

    return () => window.removeEventListener('message', handleEventListener);
  }, []);

  return (
    <FullScreenLayout>
      <div className={styles.container}>
        <div className={styles.box}>
          <SocialButtons />
          <Link to="/test">테스트</Link>
          <form action="/sign-in" method="post">
            <input type="text" name="email" placeholder="email" />
            <input type="password" name="password" placeholder="password" />
          </form>
        </div>
      </div>
    </FullScreenLayout>
  );
};

export default SignIn;
