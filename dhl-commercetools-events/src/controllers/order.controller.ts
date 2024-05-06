import { NextFunction, Request, Response } from 'express';
import CustomError from '../errors/custom.error';
import { logger } from '../utils/logger.utils';
import { MessagePayload } from '@commercetools/platform-sdk';
import {
  handleDeliveryAddedMessage,
  handleParcelRemovedMessage,
} from '../service/delivery.service';

function parseRequest(request: Request) {
  if (!request.body) {
    logger.error('Missing request body.');
    throw new CustomError(400, 'Bad request: No Pub/Sub message was received');
  }
  if (!request.body.message) {
    logger.error('Missing body message');
    throw new CustomError(400, 'Bad request: Wrong No Pub/Sub message format');
  }
  const pubSubMessage = request.body.message;
  const decodedData = pubSubMessage.data
    ? Buffer.from(pubSubMessage.data, 'base64').toString().trim()
    : undefined;
  if (decodedData) {
    logger.info(`Payload received: ${decodedData}`);
    return JSON.parse(decodedData) as MessagePayload;
  }
  throw new CustomError(400, 'Bad request: No payload in the Pub/Sub message');
}

/**
 * Exposed event POST endpoint.
 * Receives the Pub/Sub message and works with it
 *
 * @param {Request} request The express request
 * @param {Response} response The express response
 * @param {NextFunction} next
 * @returns
 */
export const handleOrderMessage = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const message = parseRequest(request);
    switch (message.type) {
      case 'DeliveryAdded':
        await handleDeliveryAddedMessage(message.delivery);
        response.status(204).send();
        return;
      case 'ParcelRemovedFromDelivery':
        await handleParcelRemovedMessage(message.parcel);
        response.status(204).send();
        return;
      default:
        response.status(204).send();
        return;
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
      next(new CustomError(400, error.message));
    } else {
      logger.error(JSON.stringify(error));
      next(error);
    }
  }
};
