import {useLocation, useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {
  handleRequestAuthByGoogle,
  handleRequestAuthByKakao,
  handleRequestAuthByNaver,
} from '../utils/OAuth2Helper.ts';

const OAuth2Callback = () => {
  const {platform} = useParams();
  const location = useLocation();

  const handleRequestAuthByOAuth2 = async (params: URLSearchParams) => {
    if (platform === 'google') {
      await handleRequestAuthByGoogle(params);
    } else if (platform === 'kakao') {
      await handleRequestAuthByKakao(params);
    } else if (platform === 'naver') {
      await handleRequestAuthByNaver(params);
    } else {
      alert('알 수 없는 플랫폼입니다.');
    }
  };

  useEffect(() => {
    if (!platform) {
      alert('플랫폼 정보가 없습니다.');
      return;
    }

    const params = new URLSearchParams(location.search);

    handleRequestAuthByOAuth2(params);
  }, [platform, location]);

  return null;
};

export default OAuth2Callback;
