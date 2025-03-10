import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useShallow} from 'zustand/react/shallow';
import {useMemberStore} from '../../zustand/MemberStore.ts';

const NaverCallback = () => {
  const navigate = useNavigate();

  const {isSignedIn} = useMemberStore(
    useShallow(state => ({
      isSignedIn: state.isSignedIn,
    }))
  );

  const handleNaverAuth = async () => {
    try {
      if (window?.naver) {
        const naverLogin = new window.naver.LoginWithNaverId({
          clientId: import.meta.env.VITE_NAVER_CLIENT_ID,
          callbackUrl: import.meta.env.VITE_NAVER_REDIRECT_URI,
          isPopup: false,
        });

        naverLogin.init();

        naverLogin.getLoginStatus(status => {
          if (status) {
            alert(naverLogin.user.id);
          }
        });
      }
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
