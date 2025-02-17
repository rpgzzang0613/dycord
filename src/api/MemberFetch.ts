import {HttpMethod, requestToApi} from './FetchHelper.ts';

export const testFetch = async (method: HttpMethod) => {
  const requestParams = {
    method: method,
    endpoint: '/test',
    params: {test: 'test'},
  };

  return await requestToApi(requestParams);
};
