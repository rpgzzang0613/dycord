import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {useMemberStore} from '../../zustand/MemberStore.ts';
import {useShallow} from 'zustand/react/shallow';
import {fetchKakaoProfile, fetchKakaoToken} from '../../api/external/SocialFetch.ts';
import {
  KakaoErrorResponse,
  KakaoProfileResponse,
  KakaoTokenResponse,
} from '../../api/external/types.ts';

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
        alert('카카오 계정 인증 실패');
        return;
      }

      const tokenRes = await fetchKakaoToken(code);
      if (tokenRes.errorCode !== 'SUCCEED') {
        const errData = tokenRes.data as KakaoErrorResponse;
        console.error(errData.msg);
        return;
      }

      // TODO id_token을 이용한 OpenID Connect 방식 알아보기
      // const {access_token, id_token} = tokenRes.data;
      const {access_token} = tokenRes.data as KakaoTokenResponse;
      const profileRes = await fetchKakaoProfile(access_token);
      if (profileRes.errorCode !== 'SUCCEED') {
        console.error(profileRes, '카카오 프로필 조회 실패');
        alert('카카오 프로필 조회 실패');
        return;
      }

      const profileData = profileRes.data as KakaoProfileResponse;

      console.log(profileData, '카카오 프로필 조회 결과');
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
