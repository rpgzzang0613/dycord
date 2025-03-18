import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useShallow} from 'zustand/react/shallow';
import {useMemberStore} from '../../zustand/MemberStore.ts';
import {requestNaverAuth} from '../../api/SocialFetch.ts';

const NaverCallback = () => {
  const navigate = useNavigate();

  const {isSignedIn} = useMemberStore(
    useShallow(state => ({
      isSignedIn: state.isSignedIn,
    }))
  );

  const handleNaverAuth = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const state = params.get('state');

      if (!code || !state) {
        alert('네이버 계정 인증 실패');
        return;
      }

      const storedState = window.localStorage.getItem('naver_state');

      if (storedState !== state) {
        alert('state 불일치');
        return;
      }

      const res = await requestNaverAuth(code, state);
    } catch (error) {
      console.error(error);
      alert('네이버 계정 인증 실패');
    }
  };

  useEffect(() => {
    handleNaverAuth();
  }, []);

  // navigate를 써서 다른 페이지로 빠지므로 화면 렌더링 없이 null 반환
  return null;
};

export default NaverCallback;
