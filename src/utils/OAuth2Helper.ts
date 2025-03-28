import {v4} from 'uuid';

// 소셜 플랫폼 정보
export const platformInfo: Record<
  string,
  {baseUrl: string; clientId: string; redirectUri: string}
> = {
  kakao: {
    baseUrl: 'https://kauth.kakao.com/oauth/authorize',
    clientId: import.meta.env.VITE_KAKAO_CLIENT_ID,
    redirectUri: import.meta.env.VITE_BASE_URI + import.meta.env.VITE_KAKAO_REDIRECT_URI,
  },
  naver: {
    baseUrl: 'https://nid.naver.com/oauth2.0/authorize',
    clientId: import.meta.env.VITE_NAVER_CLIENT_ID,
    redirectUri: import.meta.env.VITE_BASE_URI + import.meta.env.VITE_NAVER_REDIRECT_URI,
  },
  google: {
    baseUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    redirectUri: import.meta.env.VITE_BASE_URI + import.meta.env.VITE_GOOGLE_REDIRECT_URI,
  },
};

// 플랫폼별 Code 요청 파라미터 세팅 후 반환
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

// 소셜로그인 팝업 오픈
export const openOAuth2Popup = (platform: string, params: URLSearchParams) => {
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
