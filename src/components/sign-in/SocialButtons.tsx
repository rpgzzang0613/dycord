import styles from './SocialButtons.module.css';
import {
  createPlatformParams,
  openOAuth2Popup,
  platformInfo,
  platformKeys,
} from '../../utils/OAuth2Helper.ts';

const SocialButtons = () => {
  const handleOnClick = async (platform: string) => {
    if (!platformKeys.includes(platform)) {
      alert('소셜 플랫폼 파라미터 오류');
      return;
    }

    const params = createPlatformParams(platform);

    openOAuth2Popup({
      platform: platform,
      params: params,
    });
  };

  return (
    <div className={styles.buttonArea}>
      {platformKeys.map(platform => (
        <button
          key={platform}
          className={`${styles.button} ${styles[platform]}`}
          onClick={() => handleOnClick(platform)}
        >
          <span>{platformInfo[platform].kor} 로그인</span>
        </button>
      ))}
    </div>
  );
};

export default SocialButtons;
