import styles from './SocialButtons.module.css';
import {createPlatformParams, openOAuth2Popup} from '../../utils/OAuth2Helper.ts';

const SocialButtons = () => {
  const handleRequestOAuth2Code = async (platform: string) => {
    if (!['google', 'kakao', 'naver'].includes(platform)) {
      alert('소셜 플랫폼 파라미터 오류');
      return;
    }

    const params = createPlatformParams(platform);

    openOAuth2Popup(platform, params);
  };

  return (
    <div className={styles.buttonArea}>
      <button
        className={`${styles.button} ${styles.kakao}`}
        onClick={() => handleRequestOAuth2Code('kakao')}
      >
        <span>카카오 로그인</span>
      </button>

      <button
        className={`${styles.button} ${styles.naver}`}
        onClick={() => handleRequestOAuth2Code('naver')}
      >
        <span>네이버 로그인</span>
      </button>

      <button
        className={`${styles.button} ${styles.google}`}
        onClick={() => handleRequestOAuth2Code('google')}
      >
        <span>구글 로그인</span>
      </button>
    </div>
  );
};

export default SocialButtons;
