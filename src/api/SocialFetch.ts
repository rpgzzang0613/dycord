import {ContentType, ErrorCode, HttpMethod, requestToApi} from './FetchHelper.ts';

export const requestAuthByOIDC = async ({
  code,
  nonce = '',
  state = '',
  codeVerifier,
  platform,
}: {
  code: string;
  nonce?: string;
  state?: string;
  codeVerifier: string;
  platform: string;
}) => {
  try {
    if (platform === 'google' && !nonce) {
      return {
        errorCode: ErrorCode.FAILED,
        data: {
          msg: '구글 로그인 실패 (nonce 없음)',
        },
      };
    }

    if (platform === 'kakao' && !nonce) {
      return {
        errorCode: ErrorCode.FAILED,
        data: {
          msg: '카카오 로그인 실패 (nonce 없음)',
        },
      };
    }

    if (platform === 'naver' && !state) {
      return {
        errorCode: ErrorCode.FAILED,
        data: {
          msg: '네이버 로그인 실패 (state 없음)',
        },
      };
    }

    const res = await requestToApi({
      endpoint: '/auth/oidc',
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      paramObj: {
        code: code,
        nonce: nonce,
        state: state,
        codeVerifier: codeVerifier,
        platform: platform,
      },
    });

    if (!res?.ok) {
      return {
        errorCode: ErrorCode.FAILED,
        data: {
          msg: res ? await res.json() : '실패',
        },
      };
    }

    return {
      errorCode: ErrorCode.SUCCEED,
      data: await res.json(),
    };
  } catch (error) {
    return {
      errorCode: ErrorCode.EXCEPTION,
      data: {
        msg: `토큰 요청 예외 발생: ${error}`,
      },
    };
  }
};
