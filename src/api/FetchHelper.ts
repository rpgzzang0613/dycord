export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum ContentType {
  JSON = 'application/json',
  FORM = 'application/x-www-form-urlencoded',
}

export enum ErrorCode {
  SUCCEED = 'SUCCEED',
  FAILED = 'FAILED',
  EXCEPTION = 'EXCEPTION',
}

interface RequestParams {
  endpoint: string;
  method: HttpMethod;
  contentType?: ContentType;
  baseUrl?: string;
  paramObj?: Record<string, unknown>;
  headerObj?: Record<string, string>;
}

/**
 * API 요청용 Wrapper 함수
 * @param {RequestParams} requestObj
 * @param {string} requestObj.endpoint (*필수) API 요청을 보낼 Endpoint URL (ex. '/v1/user')
 * @param {HttpMethod} requestObj.method (*필수) HttpMethod Enum ('GET', 'POST', 'PUT', 'DELETE')
 * @param {string} requestObj.baseUrl (선택) 별도의 외부 업체 API로 요청을 보낼 때의 Base URL (미지정시 내부 API로 요청)
 * @param {ContentType} requestObj.contentType (선택) ContentType Enum ('application/json', 'application/x-www-form-urlencoded')
 * @param {Record<string, unknown>} requestObj.paramObj (선택) 요청 파라미터를 담은 Object. HttpMethod와 ContentType에 따라 형태를 자동으로 변경하여 전달하므로 Object 형태로만 전달하면 됨
 * @param {Record<string, string>} requestObj.headerObj (선택) ***Content-Type 을 제외하고*** 추가할 Header 정보를 담은 Object. (ex. Authorization, 커스텀 헤더 등)
 */
export const requestToApi = async ({
  endpoint,
  method,
  baseUrl = import.meta.env.VITE_API_URI,
  contentType,
  paramObj = {},
  headerObj = {},
}: RequestParams) => {
  if (!endpoint.startsWith('/')) {
    console.error('endpoint는 /로 시작해야함');
    return;
  }

  let url = baseUrl + endpoint;

  if (headerObj['Content-Type'] != null) {
    console.error('Content-Type은 headerObj에 포함시키지 말고 contentType으로 전달해야함');
    return;
  }

  headerObj = {
    ...headerObj,
    ...(contentType ? {'Content-Type': contentType} : {}),
  };

  const headers = new Headers(headerObj);

  const {invalidK, invalidV} = checkInvalidParams(paramObj);

  if (invalidK) {
    console.error(`유효하지 않은 형식의 파라미터 - key: ${invalidK} / value: ${invalidV}`);
    return;
  }

  let body;
  if (method === HttpMethod.GET) {
    if (Object.keys(paramObj).length > 0) {
      url += '?' + getUrlSearchParams(paramObj);
    }
  } else {
    body =
      contentType === ContentType.FORM ? getUrlSearchParams(paramObj) : JSON.stringify(paramObj);
  }

  const options: RequestInit = {
    method: method,
    headers: headers,
    ...(method !== 'GET' && body ? {body: body} : {}),
  };

  return await fetch(url, options);
};

const checkInvalidParams = (params: Record<string, unknown>) => {
  let invalidK = '';
  let invalidV = '';
  for (const key in params) {
    if (params[key] == null) {
      invalidK = key;
      if (typeof params[key] === 'object') {
        invalidV = JSON.stringify(params[key]);
      } else {
        invalidV = String(params[key]);
      }
      break;
    }
  }

  return {invalidK, invalidV};
};

const getUrlSearchParams = (paramObj: Record<string, unknown>) => {
  return new URLSearchParams(
    Object.entries(paramObj).map(([k, v]) => [
      k,
      typeof v === 'object' ? JSON.stringify(v) : String(v),
    ])
  ).toString();
};
