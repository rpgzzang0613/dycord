import {useEffect} from 'react';
import {requestOIDCAuth} from '../api/SocialFetch.ts';
import {ErrorCode} from '../api/FetchHelper.ts';

const KakaoCallback = () => {
  const handleKakaoAuth = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      if (!code) {
        alert('카카오 code 요청 실패');
        return;
      }

      const nonce = window.sessionStorage.getItem('kakao_nonce');
      if (!nonce) {
        alert('카카오 nonce 불러오기 실패');
        return;
      }

      const res = await requestOIDCAuth(code, nonce, 'kakao');
      if (res.errorCode !== ErrorCode.SUCCEED) {
        console.error(res);
        alert('카카오 계정 인증 실패');
        return;
      }

      window.opener.postMessage(res.data, import.meta.env.VITE_BASE_URI);
      self.close();
    } catch (error) {
      console.error(error);
      alert('카카오 계정 인증 실패');
    }
  };

  useEffect(() => {
    handleKakaoAuth();
  }, []);

  return null;
};

export default KakaoCallback;
