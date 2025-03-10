import '../../styles/SocialButtons.css';
import {useEffect} from 'react';

const SocialButtons = () => {
  useEffect(() => {
    if (window?.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(import.meta.env.VITE_KAKAO_APP_KEY);
      }
    } else {
      alert('Kakao SDK 로딩 실패');
    }

    if (window?.naver) {
      const naverLogin = new window.naver.LoginWithNaverId({
        clientId: import.meta.env.VITE_NAVER_CLIENT_ID,
        callbackUrl: import.meta.env.VITE_NAVER_REDIRECT_URI,
        isPopup: false,
        loginButton: {color: 'green', type: 1, height: 60},
      });

      naverLogin.init();
    }
  }, []);

  const handleKakaoLogin = async () => {
    window.Kakao.Auth.authorize({
      redirectUri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
    });
  };

  const handleNaverLogin = async () => {
    document.getElementById('naverIdLogin_loginButton')?.click();
  };

  return (
    <div className="button-area">
      <button className="button kakao" onClick={handleKakaoLogin}>
        <span>카카오 로그인</span>
      </button>
      <button className="button naver" onClick={handleNaverLogin}>
        <span>네이버 로그인</span>
      </button>
      <div id="naverIdLogin" style={{display: 'none'}} />
    </div>
  );
};

export default SocialButtons;
