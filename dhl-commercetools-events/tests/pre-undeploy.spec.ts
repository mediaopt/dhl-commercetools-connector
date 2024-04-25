import { describe, expect } from '@jest/globals';

let apiRequest: any = undefined;
let apiRoot: any = undefined;
const mockConfigModule = () => {
  apiRequest = {
    execute: jest.fn(() => ({ body: { results: [{}] } })),
  };
  apiRoot = {
    subscriptions: jest.fn(() => apiRoot),
    withKey: jest.fn(() => apiRoot),
    delete: jest.fn(() => apiRequest),
    get: jest.fn(() => apiRequest),
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

describe('Testing pre undeploy', () => {
  test('Testing pre undeploy', async () => {
    require('../src/connector/pre-undeploy');
    await sleep(5000);
    expect(apiRoot.delete).toBeCalledTimes(1);
    expect(apiRoot.get).toBeCalledTimes(1);
    expect(apiRequest.execute).toBeCalledTimes(2);
  }, 10000);
});
