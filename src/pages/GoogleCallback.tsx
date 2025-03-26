import {requestOIDCAuth} from '../api/SocialFetch.ts';
import {ErrorCode} from '../api/FetchHelper.ts';
import {useEffect} from 'react';

const GoogleCallback = () => {
  const handleGoogleAuth = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const state = params.get('state');
      if (!code || !state) {
        alert('구글 계정 인증 실패');
        return;
      }

      const storedState = window.sessionStorage.getItem('google_state');
      if (storedState !== state) {
        alert('state 불일치');
        return;
      }

      const nonce = window.sessionStorage.getItem('google_nonce');
      if (!nonce) {
        alert('구글 nonce 불러오기 실패');
        return;
      }

      const res = await requestOIDCAuth(code, nonce, 'google');
      if (res.errorCode !== ErrorCode.SUCCEED) {
        console.error(res);
        alert('구글 계정 인증 실패');
        return;
      }

      window.opener.postMessage(res.data, import.meta.env.VITE_BASE_URI);
      self.close();
    } catch (error) {
      console.error(error);
      alert('구글 계정 인증 실패');
    }
  };

  useEffect(() => {
    handleGoogleAuth();
  }, []);

  return null;
};

export default GoogleCallback;
