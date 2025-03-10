export interface SocialResponse {
  errorCode: 'SUCCEED' | 'FAILED' | 'EXCEPTION';
  data: KakaoTokenResponse | KakaoProfileResponse | KakaoErrorResponse;
}

export interface KakaoErrorResponse {
  msg: string;
}

export interface KakaoTokenResponse {
  token_type: string;
  access_token: string;
  id_token?: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope?: string;
}

export interface KakaoProfileResponse {
  id: number;
  has_signed_up?: boolean;
  connected_at?: string;
  properties?: {
    nickname: string;
    profile_image: string;
    thumbnail_image: string;
  };
  kakao_account?: {
    profile_needs_agreement?: boolean;
    profile?: {
      nickname?: string;
      thumbnail_image_url?: string;
      profile_image_url?: string;
    };
    email_needs_agreement?: boolean;
    is_email_valid?: boolean;
    is_email_verified?: boolean;
    email?: string;
    age_range_needs_agreement?: boolean;
    age_range?: string;
    birthday_needs_agreement?: boolean;
    birthday?: string;
  };
  for_partner?: boolean;
}

export const fetchKakaoToken = async (code: string): Promise<SocialResponse> => {
  try {
    const fetchRes = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: import.meta.env.VITE_KAKAO_REST_KEY,
        redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
        code: code,
        client_secret: import.meta.env.VITE_KAKAO_CLIENT_SECRET,
      }),
    });

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

export const fetchKakaoProfile = async (accessToken: string): Promise<SocialResponse> => {
  try {
    const fetchRes = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });

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
