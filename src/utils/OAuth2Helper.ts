import {v4} from 'uuid';
import {requestNaverAuth, requestOIDCAuth} from '../api/SocialFetch.ts';
import {ErrorCode} from '../api/FetchHelper.ts';

/**
 * 소셜 플랫폼 목록
 */
export const platformKeys = ['kakao', 'naver', 'google'];

/**
 * 소셜 플랫폼 정보
 */
export const platformInfo: Record<
  string,
  {kor: string; baseUrl: string; clientId: string; redirectUri: string}
> = {
  kakao: {
    kor: '카카오',
    baseUrl: 'https://kauth.kakao.com/oauth/authorize',
    clientId: import.meta.env.VITE_KAKAO_CLIENT_ID,
    redirectUri: import.meta.env.VITE_BASE_URI + import.meta.env.VITE_KAKAO_REDIRECT_URI,
  },
  naver: {
    kor: '네이버',
    baseUrl: 'https://nid.naver.com/oauth2.0/authorize',
    clientId: import.meta.env.VITE_NAVER_CLIENT_ID,
    redirectUri: import.meta.env.VITE_BASE_URI + import.meta.env.VITE_NAVER_REDIRECT_URI,
  },
  google: {
    kor: '구글',
    baseUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    redirectUri: import.meta.env.VITE_BASE_URI + import.meta.env.VITE_GOOGLE_REDIRECT_URI,
  },
};

/**
 * 플랫폼별 Code 요청 파라미터 세팅 후 반환하는 함수
 * @param platform
 */
export const createPlatformParams = (platform: string) => {
  const nonce = v4();
  const state = v4();

  const params = new URLSearchParams({
    client_id: platformInfo[platform].clientId,
    redirect_uri: platformInfo[platform].redirectUri,
    response_type: 'code',
  });

  if (platform === 'google') {
    window.sessionStorage.setItem('google_state', state);
    window.sessionStorage.setItem('google_nonce', nonce);
    params.set('state', state);
    params.set('nonce', nonce);
    params.set('scope', 'openid email');
  } else if (platform === 'kakao') {
    window.sessionStorage.setItem('kakao_nonce', nonce);
    params.set('nonce', nonce);
  } else if (platform === 'naver') {
    window.sessionStorage.setItem('naver_state', state);
    params.set('state', state);
  }

  return params;
};

/**
 * 소셜로그인 팝업 오픈하는 함수
 * @param platform
 * @param params
 */
export const openOAuth2Popup = ({
  platform,
  params,
}: {
  platform: string;
  params: URLSearchParams;
}) => {
  const POPUP_WIDTH = 450;
  const POPUP_HEIGHT = 600;

  // 현재 창의 위치
  const WINDOW_LEFT = window.screenLeft ?? window.screenX;
  const WINDOW_TOP = window.screenTop ?? window.screenY;

  // 현재 창의 크기
  const WINDOW_WIDTH = window.outerWidth;
  const WINDOW_HEIGHT = window.outerHeight;

  // 팝업을 띄울 좌표 (브라우저가 떠있는 화면 중앙)
  const POPUP_X = Math.round(WINDOW_LEFT + (WINDOW_WIDTH - POPUP_WIDTH) / 2);
  const POPUP_Y = Math.round(WINDOW_TOP + (WINDOW_HEIGHT - POPUP_HEIGHT) / 2);

  const fullUrl = `${platformInfo[platform].baseUrl}?${params.toString()}`;
  const popupTarget = `${platform}_popup`;

  window.open(
    fullUrl,
    popupTarget,
    `width=${POPUP_WIDTH}, height=${POPUP_HEIGHT}, top=${POPUP_Y}, left=${POPUP_X}, location=no`
  );
};

export const handleRequestGoogleAuth = async (params: URLSearchParams) => {
  try {
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

    const res = await requestOIDCAuth({code: code, nonce: nonce, platform: 'google'});
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

export const handleRequestKakaoAuth = async (params: URLSearchParams) => {
  try {
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

    const res = await requestOIDCAuth({code: code, nonce: nonce, platform: 'kakao'});
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

export const handleRequestNaverAuth = async (params: URLSearchParams) => {
  try {
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
