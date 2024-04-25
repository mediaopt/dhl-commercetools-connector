import { DHL_DEFAULT_PROFILE } from '../src/constants';

const dhlApi: any = {
  ordersAccountDelete: jest.fn(() => ({
    data: {
      status: {
        statusCode: 200,
      },
      items: [
        {
          sstatus: {
            title: 'Success',
          },
        },
      ],
    },
  })),
  createOrders: jest.fn(() => ({
    data: {
      status: {
        statusCode: 200,
      },
      items: [
        {
          sstatus: {
            title: 'Success',
          },
        },
      ],
    },
  })),
};

const apiRoot: any = {
  orders: jest.fn(() => ({
    get: jest.fn(() => ({
      execute: jest.fn(() => ({ body: { total: 1, results: [order] } })),
    })),
    withId: jest.fn(() => ({
      post: jest.fn(() => ({
        execute: jest.fn(),
      })),
    })),
  })),
  customObjects: jest.fn(() => ({
    withContainerAndKey: jest.fn(() => ({
      get: jest.fn(() => ({
        execute: jest.fn(() => ({ body: { value: settings } })),
      })),
    })),
  })),
};
jest.mock('../src/client/create.client', () => {
  return {
    createApiRoot: () => apiRoot,
  };
});
jest.mock('../src/parcel-de-shipping/api', () => ({
  ShipmentsAndLabelsApiFactory: jest.fn(() => dhlApi),
}));

import { describe, expect, test } from '@jest/globals';
import {
  handleParcelRemovedMessage,
  handleDeliveryAddedMessage,
} from '../src/service/delivery.service';
import { delivery, order, parcel, settings } from './test.data';
import { mapCommercetoolsOrderToDHLShipment } from '../src/utils/map.utils';

beforeEach(() => {
  jest.clearAllMocks();
});
describe('Testing delivery service message handling', () => {
  test('test handleParcelRemovedMessage', async () => {
    const item = {
      sstatus: {
        title: 'Success',
      },
    };
    const response = await handleParcelRemovedMessage(parcel);
    expect(response).toEqual(item);
    expect(dhlApi.ordersAccountDelete).toBeCalledTimes(1);
    expect(dhlApi.ordersAccountDelete).toBeCalledWith(
      DHL_DEFAULT_PROFILE,
      '0034043333301020001499266'
    );
  }, 20000);

  test('test handleDeliveryAddedMessage', async () => {
    const expectedShipment = mapCommercetoolsOrderToDHLShipment(
      order,
      delivery,
      settings
    );
    await handleDeliveryAddedMessage(delivery);
    expect(dhlApi.createOrders).toBeCalledTimes(1);
    expect(dhlApi.createOrders).toBeCalledWith(
      {
        profile: DHL_DEFAULT_PROFILE,
        shipments: [expectedShipment],
      },
      undefined,
      undefined,
      false,
      'URL'
    );
  }, 20000);
});
