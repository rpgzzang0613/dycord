import {
  KakaoErrorResponse,
  KakaoProfileResponse,
  KakaoTokenResponse,
  SocialResponse,
} from './types.ts';
import {ContentType, HttpMethod, requestToApi} from '../FetchHelper.ts';

export const fetchKakaoToken = async (
  code: string
): Promise<SocialResponse<KakaoTokenResponse | KakaoErrorResponse>> => {
  try {
    const fetchRes = await requestToApi({
      endpoint: '/oauth/token',
      method: HttpMethod.POST,
      baseUrl: 'https://kauth.kakao.com',
      contentType: ContentType.FORM,
      paramObj: {
        grant_type: 'authorization_code',
        client_id: import.meta.env.VITE_KAKAO_REST_KEY,
        redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
        code: code,
        client_secret: import.meta.env.VITE_KAKAO_CLIENT_SECRET,
      },
    });

    if (!fetchRes) {
      return {
        errorCode: 'FAILED',
        data: {
          msg: '토큰 요청 실패 - fetch 결과 null',
        },
      };
    }

    if (!fetchRes.ok) {
      const errorData = await fetchRes.json();
      console.log(errorData);
      return {
        errorCode: 'FAILED',
        data: {
          msg: `토큰 요청 HTTP 응답 오류 - HttpStatus: ${fetchRes.status}, KakaoErrorCode: ${errorData?.error_code}, KakaoErrorDescription: ${errorData?.error_description}`,
        },
      };
    }

    return {
      errorCode: 'SUCCEED',
      data: await fetchRes.json(),
    };
  } catch (error) {
    return {
      errorCode: 'EXCEPTION',
      data: {
        msg: `토큰 요청 예외 발생: ${error}`,
      },
    };
  }
};

export const fetchKakaoProfile = async (
  accessToken: string
): Promise<SocialResponse<KakaoProfileResponse | KakaoErrorResponse>> => {
  try {
    const fetchRes = await requestToApi({
      endpoint: '/v2/user/me',
      method: HttpMethod.GET,
      baseUrl: 'https://kapi.kakao.com',
      contentType: ContentType.FORM,
      headerObj: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!fetchRes) {
      return {
        errorCode: 'FAILED',
        data: {
          msg: '프로필 요청 실패 - fetch response 없음',
        },
      };
    }

    if (!fetchRes.ok) {
      const errorData = await fetchRes.json();
      return {
        errorCode: 'FAILED',
        data: {
          msg: `프로필 요청 HTTP 응답 오류: ${fetchRes.status}, KakaoErrorCode: ${errorData?.error_code}, KakaoErrorDescription: ${errorData?.error_description}`,
        },
      };
    }

    return {
      errorCode: 'SUCCEED',
      data: await fetchRes.json(),
    };
  } catch (error) {
    return {
      errorCode: 'EXCEPTION',
      data: {
        msg: `프로필 요청 예외 발생: ${error}`,
      },
    };
  }
};
