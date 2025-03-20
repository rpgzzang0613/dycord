import '../../styles/SocialButtons.css';
import {POPUP_HEIGHT, POPUP_WIDTH, POPUP_X, POPUP_Y} from '../../utils/SocialPopup.ts';

const SocialButtons = () => {
  const handleKakaoLogin = async () => {
    const nonce = crypto.randomUUID();
    window.localStorage.setItem('kakao_nonce', nonce);

    window.open(
      `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_BASE_URI + import.meta.env.VITE_KAKAO_REDIRECT_URI}&nonce=${nonce}&response_type=code`,
      'kakao_popup',
      `width=${POPUP_WIDTH}, height=${POPUP_HEIGHT}, top=${POPUP_Y}, left=${POPUP_X} location=no`
    );
  };

  const handleNaverLogin = async () => {
    const state = crypto.randomUUID();
    window.localStorage.setItem('naver_state', state);

    window.open(
      `https://nid.naver.com/oauth2.0/authorize?client_id=${import.meta.env.VITE_NAVER_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_BASE_URI + import.meta.env.VITE_NAVER_REDIRECT_URI}&state=${state}&response_type=code`,
      'naver_popup',
      `width=${POPUP_WIDTH}, height=${POPUP_HEIGHT}, top=${POPUP_Y}, left=${POPUP_X} location=no`
    );
  };

  return (
    <div className="button-area">
      <button className="button kakao" onClick={handleKakaoLogin}>
        <span>카카오 로그인 with Rest</span>
      </button>

      <button className="button naver" onClick={handleNaverLogin}>
        <span>네이버 로그인 with Rest</span>
      </button>
    </div>
  );
};

export default SocialButtons;
