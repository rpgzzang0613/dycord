import SocialButtons from '../components/sign-in/SocialButtons.tsx';
import {Link, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import FullScreenLayout from '../layout/FullScreenLayout.tsx';

const SignIn = () => {
  const navigate = useNavigate();

  const [test, setTest] = useState('');

  useEffect(() => {
    const handleSocialMessage = (event: MessageEvent) => {
      const isValidOrigin = event.origin === import.meta.env.VITE_BASE_URI;
      const isValidData = event?.data != null;
      const isReactDeveloperMessage =
        event.data?.source != null && event.data.source.includes('react-devtools');

      if (!isValidOrigin || !isValidData || isReactDeveloperMessage) {
        return;
      }

      setTest(JSON.stringify(event.data));
    };

    window.addEventListener('message', handleSocialMessage);

    return () => window.removeEventListener('message', handleSocialMessage);
  }, []);

  return (
    <FullScreenLayout>
      <h1>로그인</h1>
      <div>{test}</div>
      <SocialButtons />
      <Link to="/test">테스트</Link>
      <form action="/sign-in" method="post">
        <input type="text" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
      </form>
    </FullScreenLayout>
  );
};

export default SignIn;
