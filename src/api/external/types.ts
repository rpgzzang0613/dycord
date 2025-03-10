export type ErrorCode = 'SUCCEED' | 'FAILED' | 'EXCEPTION';

export interface SocialResponse<T> {
  errorCode: ErrorCode;
  data: T;
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
