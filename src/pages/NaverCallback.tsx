import {useEffect} from 'react';
import {requestNaverAuth} from '../api/SocialFetch.ts';
import {ErrorCode} from '../api/FetchHelper.ts';

const NaverCallback = () => {
  const handleNaverAuth = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const state = params.get('state');
      if (!code || !state) {
        alert('네이버 계정 인증 실패');
        return;
      }

      const storedState = window.sessionStorage.getItem('naver_state');
      if (storedState !== state) {
        alert('state 불일치');
        return;
      }

      const res = await requestNaverAuth({code: code, state: state, platform: 'naver'});
      if (res.errorCode !== ErrorCode.SUCCEED) {
        console.error(res);
        alert('네이버 계정 인증 실패');
        return;
      }

      window.opener.postMessage(res.data, import.meta.env.VITE_BASE_URI);
      self.close();
    } catch (error) {
      console.error(error);
      alert('네이버 계정 인증 실패');
    }
  };

  useEffect(() => {
    handleNaverAuth();
  }, []);

  return null;
};

export default NaverCallback;
