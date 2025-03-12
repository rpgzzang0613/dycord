import {ContentType, HttpMethod, requestToApi} from './FetchHelper.ts';

export const testFetch = async (method: HttpMethod, contentType?: ContentType) => {
  let endpoint = '/test';
  if (method === HttpMethod.GET) {
    endpoint += '/get';
  } else {
    endpoint += contentType === ContentType.FORM ? '/post-form' : '/post-json';
  }

  return await requestToApi({
    endpoint: endpoint,
    method: method,
    contentType: contentType,
    paramObj: {test: 'test'},
  });
};
