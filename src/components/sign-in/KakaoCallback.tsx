import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {useMemberStore} from '../../zustand/MemberStore.ts';
import {useShallow} from 'zustand/react/shallow';
import {requestKakaoAuth} from '../../api/SocialFetch.ts';
import {ErrorCode} from '../../api/FetchHelper.ts';

const KakaoCallback = () => {
  const navigate = useNavigate();

  const {isSignedIn} = useMemberStore(
    useShallow(state => ({
      isSignedIn: state.isSignedIn,
    }))
  );

  const handleKakaoAuth = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (!code) {
        alert('카카오 code 요청 실패');
        return;
      }

      const nonce = window.localStorage.getItem('kakao_nonce');

      if (!nonce) {
        alert('카카오 nonce 불러오기 실패');
        return;
      }

      const res = await requestKakaoAuth(code, nonce);
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

  // navigate를 써서 다른 페이지로 빠지므로 화면 렌더링 없이 null 반환
  return null;
};

export default KakaoCallback;
