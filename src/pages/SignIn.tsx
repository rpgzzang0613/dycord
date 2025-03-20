import SocialButtons from '../components/sign-in/SocialButtons.tsx';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';

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
    <div>
      <h1>로그인</h1>
      <div>{test}</div>
      <SocialButtons />
      <form action="/sign-in" method="post">
        <input type="text" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
      </form>
    </div>
  );
};

export default SignIn;
