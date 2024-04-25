import { MessagePayload } from '@commercetools/platform-sdk';
import { NextFunction, Request, Response } from 'express';
import { describe, expect, test } from '@jest/globals';
import { delivery, parcel } from './test.data';

const messageHandler = jest.fn();
jest.mock('../src/service/delivery.service', () => ({
  handleDeliveryAddedMessage: messageHandler,
  handleParcelRemovedMessage: messageHandler,
}));

import { post } from '../src/controllers/order.controller';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Testing order controller message handling', () => {
  test('test DeliveryAdded', async () => {
    const request = {
      body: {
        message: {
          data: Buffer.from(
            JSON.stringify({
              type: 'DeliveryAdded',
              delivery,
            } as MessagePayload)
          ).toString('base64'),
        },
      },
    } as unknown as Request;
    const response = {
      status: jest.fn(() => ({
        send: jest.fn(),
      })),
    } as unknown as Response;
    await post(request, response, jest.fn() as NextFunction);
    expect(messageHandler).toBeCalledTimes(1);
    expect(response.status).toBeCalledWith(204);
  });
  test('test ParcelRemovedFromDelivery', async () => {
    const request = {
      body: {
        message: {
          data: Buffer.from(
            JSON.stringify({
              type: 'ParcelRemovedFromDelivery',
              parcel,
            } as MessagePayload)
          ).toString('base64'),
        },
      },
    } as unknown as Request;
    const response = {
      status: jest.fn(() => ({
        send: jest.fn(),
      })),
    } as unknown as Response;
    await post(request, response, jest.fn() as NextFunction);
    expect(messageHandler).toBeCalledTimes(1);
    expect(response.status).toBeCalledWith(204);
  });

  test('test other message', async () => {
    const request = {
      body: {
        message: {
          data: Buffer.from(
            JSON.stringify({
              type: 'CategoryCreated',
              category: {},
            } as MessagePayload)
          ).toString('base64'),
        },
      },
    } as unknown as Request;
    const response = {
      status: jest.fn(() => ({
        send: jest.fn(),
      })),
    } as unknown as Response;
    await post(request, response, jest.fn() as NextFunction);
    expect(messageHandler).toBeCalledTimes(0);
    expect(response.status).toBeCalledWith(204);
  });
  test.each([
    {
      body: null,
    },
    {
      body: {
        message: null,
      },
    },
    {
      body: {
        message: {
          data: '',
        },
      },
    },
  ])('test empty message', async (request) => {
    const response = {
      status: jest.fn(() => ({
        send: jest.fn(),
      })),
    } as unknown as Response;
    const nextMock: NextFunction = jest.fn();
    await post(request as unknown as Request, response, nextMock);
    expect(messageHandler).toBeCalledTimes(0);
    expect(response.status).toBeCalledTimes(0);
    expect(nextMock).toBeCalledTimes(1);
  });
});
