export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface RequestParams {
  method: HttpMethod;
  endpoint: string;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

export const requestToApi = async ({
  method,
  endpoint,
  params = {},
  headers = {},
}: RequestParams) => {
  if (!endpoint.startsWith('/')) {
    return;
  }

  const baseUrl = 'http://localhost:9090';

  let url = baseUrl + endpoint;
  let body;

  if (method === HttpMethod.GET) {
    if (Object.keys(params).length > 0) {
      const query = new URLSearchParams(
        Object.entries(params).map(([k, v]) => [
          k,
          typeof v === 'object' ? JSON.stringify(v) : String(v),
        ])
      ).toString();
      url += '?' + query;
    }
  } else {
    body = JSON.stringify(params);
  }

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (method !== 'GET' && body) {
    options.body = body;
  }

  const response = await fetch(url, options);

  if (response.status === 200) {
    return await response.json();
  } else {
    throw new Error('fetch failed');
  }
};
