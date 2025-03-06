import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {useMemberStore} from '../../zustand/MemberStore.ts';
import {useShallow} from 'zustand/react/shallow';

const KakaoCallback = () => {
  const navigate = useNavigate();

  const {isSignedIn} = useMemberStore(
    useShallow(state => ({
      isSignedIn: state.isSignedIn,
    }))
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      alert(`code : ${code}`);
      // TODO 코드를 가지고 서버로 요청을 보내서 카카오 계정 정보를 조회 후 가입 or 로그인처리

      navigate(isSignedIn ? '/' : '/sign-in');
    } else {
      alert('카카오 계정 조회 실패');
    }
  }, []);

  // navigate를 써서 다른 페이지로 빠지므로 화면 렌더링 없이 null 반환
  return null;
};

export default KakaoCallback;
