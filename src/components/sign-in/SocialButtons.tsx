import styles from './SocialButtons.module.css';
import {POPUP_HEIGHT, POPUP_WIDTH, POPUP_X, POPUP_Y} from '../../utils/CommonValues.ts';
import {v4} from 'uuid';

const SocialButtons = () => {
  const handleRequestOauth2Code = async (platform: string) => {
    if (!['google', 'kakao', 'naver'].includes(platform)) {
      alert('소셜 플랫폼 파라미터 오류');
      return;
    }

    const platformInfo: Record<string, {baseUrl: string; clientId: string; redirectUri: string}> = {
      kakao: {
        baseUrl: 'https://kauth.kakao.com/oauth/authorize',
        clientId: import.meta.env.VITE_KAKAO_CLIENT_ID,
        redirectUri: import.meta.env.VITE_BASE_URI + import.meta.env.VITE_KAKAO_REDIRECT_URI,
      },
      naver: {
        baseUrl: 'https://nid.naver.com/oauth2.0/authorize',
        clientId: import.meta.env.VITE_NAVER_CLIENT_ID,
        redirectUri: import.meta.env.VITE_BASE_URI + import.meta.env.VITE_NAVER_REDIRECT_URI,
      },
      google: {
        baseUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        redirectUri: import.meta.env.VITE_BASE_URI + import.meta.env.VITE_GOOGLE_REDIRECT_URI,
      },
    };

    const nonce = v4();
    const state = v4();
    const responseType = 'code';

    const commonParams = {
      client_id: platformInfo[platform].clientId,
      redirect_uri: platformInfo[platform].redirectUri,
      response_type: responseType,
    };

    const getParams = () => {
      const params = new URLSearchParams({
        ...commonParams,
      });

      if (platform === 'google') {
        window.sessionStorage.setItem('google_state', state);
        window.sessionStorage.setItem('google_nonce', nonce);
        params.set('state', state);
        params.set('nonce', nonce);
        params.set('scope', 'openid email');
      } else if (platform === 'kakao') {
        window.sessionStorage.setItem('kakao_nonce', nonce);
        params.set('nonce', nonce);
      } else if (platform === 'naver') {
        window.sessionStorage.setItem('naver_state', state);
        params.set('state', state);
      }

      return params;
    };

    const params = getParams();
    const fullUrl = `${platformInfo[platform].baseUrl}?${params.toString()}`;
    const popupTarget = `${platform}_popup`;

    window.open(
      fullUrl,
      popupTarget,
      `width=${POPUP_WIDTH}, height=${POPUP_HEIGHT}, top=${POPUP_Y}, left=${POPUP_X}, location=no`
    );
  };

  return (
    <div className={styles.buttonArea}>
      <button
        className={`${styles.button} ${styles.kakao}`}
        onClick={() => handleRequestOauth2Code('kakao')}
      >
        <span>카카오 로그인</span>
      </button>

      <button
        className={`${styles.button} ${styles.naver}`}
        onClick={() => handleRequestOauth2Code('naver')}
      >
        <span>네이버 로그인</span>
      </button>

      <button
        className={`${styles.button} ${styles.google}`}
        onClick={() => handleRequestOauth2Code('google')}
      >
        <span>구글 로그인</span>
      </button>
    </div>
  );
};

export default SocialButtons;
