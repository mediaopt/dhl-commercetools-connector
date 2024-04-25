import { describe, expect } from '@jest/globals';
import {
  createAndSetCustomObject,
  createOrderMessagesSubscription,
  createParcelCustomType,
  createShippingMethodCustomTypes,
  deleteOrderMessagesSubscription,
  SHIPPING_METHOD_CUSTOM_TYPES,
} from '../src/connector/actions';
import {
  CUSTOM_OBJECT_DEFAULT_VALUES,
  GRAPHQL_CUSTOMOBJECT_CONTAINER_NAME,
  GRAPHQL_CUSTOMOBJECT_KEY_NAME,
} from '../src/constants';

describe('Testing actions', () => {
  test('add extension', async () => {
    const apiRequest: any = {
      execute: jest.fn(() => ({ body: { results: [{}] } })),
    };
    const apiRoot: any = {
      subscriptions: jest.fn(() => apiRoot),
      withKey: jest.fn(() => apiRoot),
      delete: jest.fn(() => apiRequest),
      get: jest.fn(() => apiRequest),
      post: jest.fn(() => apiRequest),
    };
    await createOrderMessagesSubscription(
      apiRoot,
      'lorem ipsum',
      'lorem ipsum'
    );
    expect(apiRoot.get).toBeCalledTimes(1);
    expect(apiRoot.delete).toBeCalledTimes(1);
    expect(apiRoot.post).toBeCalledTimes(1);
    expect(apiRequest.execute).toBeCalledTimes(3);
  });

  test('set custom object', async () => {
    const apiRequest: any = {
      execute: jest.fn(() => ({ body: { results: [{}] } })),
    };
    const apiRoot: any = {
      customObjects: jest.fn(() => apiRoot),
      withContainerAndKey: jest.fn(() => apiRoot),
      post: jest.fn(() => apiRequest),
      get: jest.fn(() => apiRequest),
    };
    await createAndSetCustomObject(apiRoot);
    expect(apiRoot.get).toBeCalledTimes(1);
    expect(apiRoot.post).toBeCalledTimes(1);
    expect(apiRoot.post).toBeCalledWith({
      body: {
        container: GRAPHQL_CUSTOMOBJECT_CONTAINER_NAME,
        key: GRAPHQL_CUSTOMOBJECT_KEY_NAME,
        value: CUSTOM_OBJECT_DEFAULT_VALUES,
      },
    });
    expect(apiRequest.execute).toBeCalledTimes(2);
  });

  test('delete extension', async () => {
    const apiRequest: any = {
      execute: jest.fn(() => ({ body: { results: [{}] } })),
    };
    const apiRoot: any = {
      subscriptions: jest.fn(() => apiRoot),
      withKey: jest.fn(() => apiRoot),
      delete: jest.fn(() => apiRequest),
      get: jest.fn(() => apiRequest),
    };
    await deleteOrderMessagesSubscription(apiRoot);
    expect(apiRoot.get).toBeCalledTimes(1);
    expect(apiRoot.delete).toBeCalledTimes(1);
    expect(apiRequest.execute).toBeCalledTimes(2);
  });

  test.each([
    {
      method: createParcelCustomType,
      expectedPostRequests: 1,
    },
    {
      method: createShippingMethodCustomTypes,
      expectedPostRequests: SHIPPING_METHOD_CUSTOM_TYPES.length,
    },
  ])('$method', async ({ method, expectedPostRequests }) => {
    const apiRequest: any = {
      execute: jest.fn(() => ({
        body: { results: [{ fieldDefinitions: [] }] },
      })),
    };
    const apiRoot: any = {
      types: jest.fn(() => apiRoot),
      withKey: jest.fn(() => apiRoot),
      post: jest.fn(() => apiRequest),
      get: jest.fn(() => apiRequest),
    };
    await method(apiRoot);
    expect(apiRoot.get).toBeCalledTimes(expectedPostRequests);
    expect(apiRoot.post).toBeCalledTimes(expectedPostRequests);
    expect(apiRequest.execute).toBeCalledTimes(2 * expectedPostRequests);
  });
});
