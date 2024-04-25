import { describe, expect } from '@jest/globals';
import { SHIPPING_METHOD_CUSTOM_TYPES } from '../src/connector/actions';

let apiRequest: any = undefined;
let apiRoot: any = undefined;
const mockConfigModule = () => {
  apiRequest = {
    execute: jest.fn(() => ({ body: { results: [] } })),
  };
  apiRoot = {
    subscriptions: jest.fn(() => apiRoot),
    types: jest.fn(() => apiRoot),
    customObjects: jest.fn(() => apiRoot),
    withKey: jest.fn(() => apiRoot),
    withContainerAndKey: jest.fn(() => apiRoot),
    delete: jest.fn(() => apiRequest),
    get: jest.fn(() => apiRequest),
    post: jest.fn(() => apiRequest),
  };
  jest.mock('../src/client/create.client', () => {
    return {
      createApiRoot: () => apiRoot,
    };
  });
};
mockConfigModule();

function sleep(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

describe('Testing post deploy', () => {
  test('Testing post deploy', async () => {
    require('../src/connector/post-deploy');
    await sleep(10000);
    expect(apiRoot.delete).toBeCalledTimes(0);
    expect(apiRoot.get).toBeCalledTimes(
      4 + SHIPPING_METHOD_CUSTOM_TYPES.length
    );
    expect(apiRoot.post).toBeCalledTimes(
      4 + SHIPPING_METHOD_CUSTOM_TYPES.length
    );
    expect(apiRequest.execute).toBeCalledTimes(
      8 + 2 * SHIPPING_METHOD_CUSTOM_TYPES.length
    );
  }, 20000);
});
