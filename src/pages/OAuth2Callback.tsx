import {useLocation, useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {
  handleRequestGoogleAuth,
  handleRequestKakaoAuth,
  handleRequestNaverAuth,
} from '../utils/OAuth2Helper.ts';

const OAuth2Callback = () => {
  const {platform} = useParams();
  const location = useLocation();

  const handleOAuth2Auth = async (params: URLSearchParams) => {
    if (platform === 'google') {
      await handleRequestGoogleAuth(params);
    } else if (platform === 'kakao') {
      await handleRequestKakaoAuth(params);
    } else if (platform === 'naver') {
      await handleRequestNaverAuth(params);
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

    handleOAuth2Auth(params);
  }, [platform, location]);

  return null;
};

export default OAuth2Callback;
