import SocialButtons from '../components/sign-in/SocialButtons.tsx';
import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import FullScreenLayout from '../layout/FullScreenLayout.tsx';
import {toast} from 'react-toastify';

const SignIn = () => {
  const [test, setTest] = useState('');

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

      setTest(JSON.stringify(event.data));
    };

    window.addEventListener('message', handleEventListener);

    return () => window.removeEventListener('message', handleEventListener);
  }, []);

  return (
    <FullScreenLayout>
      <h1>로그인</h1>
      <div>{test}</div>
      <SocialButtons />
      <Link to="/test">테스트</Link>
      <button type="button" onClick={() => toast('까꿍')}>
        toast
      </button>
      <form action="/sign-in" method="post">
        <input type="text" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
      </form>
    </FullScreenLayout>
  );
};

export default SignIn;
