import {ContentType, ErrorCode, HttpMethod, requestToApi} from './FetchHelper.ts';

export const requestOIDCAuth = async (code: string, nonce: string, platform: string) => {
  try {
    const res = await requestToApi({
      endpoint: '/auth/oidc',
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      paramObj: {
        code: code,
        nonce: nonce,
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

export const requestNaverAuth = async (code: string, state: string, platform: string) => {
  try {
    const res = await requestToApi({
      endpoint: '/auth/naver',
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      paramObj: {
        code: code,
        state: state,
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
