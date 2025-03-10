import '../../styles/SocialButtons.css';

const SocialButtons = () => {
  const handleKakaoLogin = async () => {
    window.Kakao.Auth.authorize({
      redirectUri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
    });
  };

  const handleNaverLogin = async () => {
    console.log('까꿍');
  };

  return (
    <div className="button-area">
      <button className="button kakao" onClick={handleKakaoLogin}>
        <span>카카오 로그인</span>
      </button>
      <button className="button naver" onClick={handleNaverLogin}>
        <span>네이버 로그인</span>
      </button>
    </div>
  );
};

export default SocialButtons;
