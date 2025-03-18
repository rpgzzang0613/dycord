import {ContentType, HttpMethod, requestToApi} from './FetchHelper.ts';

export const requestKakaoAuth = async (code: string, nonce: string) => {
  try {
    const res = await requestToApi({
      endpoint: '/auth/kakao',
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      paramObj: {
        code: code,
        nonce: nonce,
      },
    });

    if (!res?.ok) {
      return {
        errorCode: 'FAILED',
        data: {
          msg: '실패',
        },
      };
    }

    return {
      errorCode: 'SUCCEED',
      data: await res.json(),
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

export const requestNaverAuth = async (code: string, state: string) => {
  try {
    const res = await requestToApi({
      endpoint: '/auth/naver',
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      paramObj: {
        code: code,
        state: state,
      },
    });

    if (!res?.ok) {
      return {
        errorCode: 'FAILED',
        data: {
          msg: '실패',
        },
      };
    }

    return {
      errorCode: 'SUCCEED',
      data: await res.json(),
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
