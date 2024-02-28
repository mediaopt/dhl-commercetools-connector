import {
  Delivery,
  Order,
  OrderAddParcelToDeliveryAction,
  Parcel,
} from '@commercetools/platform-sdk';
import { logger } from '../utils/logger.utils';
import { createApiRoot } from '../client/create.client';
import CustomError from '../errors/custom.error';
import {
  Configuration,
  LabelDataResponse,
  ShipmentsAndLabelsApiFactory,
} from '../parcel-de-shipping';
import { AxiosError } from 'axios';
import { mapCommercetoolsOrderToDHLShipment } from '../utils/map.utils';
import { SettingsFormDataType } from '../types/index.types';
import { DHL_DEFAULT_PROFILE } from '../constants';
import {
  DHL_DELIVERY_TYPE_KEY,
  DHL_PARCEL_TYPE_KEY,
} from '../connector/actions';
import { OrderUpdateAction } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/order';

const DHL_PARCEL_API_KEY = 'eg391xkOwa007rDuCVJqAo2wzG4pmWI5';

async function getOrderByDeliveryId(deliveryId: string) {
  const apiRoot = await createApiRoot();
  const orders = (
    await apiRoot
      .orders()
      .get({
        queryArgs: {
          where: `shippingInfo(deliveries(id = "${deliveryId}"))`,
          expand: [
            'shippingInfo.shippingMethod',
            'shippingInfo.shippingMethod.custom.type',
          ],
        },
      })
      .execute()
  ).body;
  if (orders.total !== 1) {
    throw new CustomError(
      500,
      `Could not find order for delivery with id ${deliveryId}`
    );
  }
  return orders.results[0];
}

export const handleParcelRemovedMessage = async (parcel: Parcel) => {
  logger.info(`Got Parcel with id ${parcel.id}`);
  if (!parcel?.custom?.fields?.dhlShipmentNumber) {
    return;
  }
  await deleteLabel(parcel?.custom?.fields?.dhlShipmentNumber);
};

export const handleDeliveryAddedMessage = async (delivery: Delivery) => {
  logger.info(`Got Delivery with id ${delivery.id}`);
  const order = await getOrderByDeliveryId(delivery.id);
  logger.info(`Got Order with id ${order.id}`);
  const shippingMethod = order.shippingInfo?.shippingMethod?.obj;
  if (
    !shippingMethod?.custom?.type?.obj?.key.startsWith('dhl-shipping-method-')
  ) {
    return;
  }
  const label = await createLabel(order, delivery);
  logger.info(JSON.stringify(label));
};

async function getSettings(): Promise<SettingsFormDataType> {
  const apiRoot = await createApiRoot();
  return (
    await apiRoot
      .customObjects()
      .withContainerAndKey({
        container: 'dhl-commercetools-connector',
        key: 'settings',
      })
      .get()
      .execute()
  ).body.value;
}

function buildApi() {
  return ShipmentsAndLabelsApiFactory(
    {
      username: process.env.DHL_GKP_USERNAME,
      password: process.env.DHL_GKP_PASSWORD,
      apiKey: DHL_PARCEL_API_KEY,
    } as Configuration,
    process.env.DHL_PARCEL_ENVIRONMENT === 'SANDBOX'
      ? 'https://api-sandbox.dhl.com/parcel/de/shipping/v2'
      : undefined
  );
}

function parseDhlValidationMessages(response: LabelDataResponse) {
  if (!response.items || !response.items[0]?.validationMessages) {
    return undefined;
  }
  return response.items[0]?.validationMessages
    .map(
      (validationMessage) =>
        `[${validationMessage.validationState}] ${validationMessage.property}: ${validationMessage.validationMessage}`
    )
    .join('; ');
}

const logDHLResponse = async (
  response: LabelDataResponse,
  order: Order,
  delivery: Delivery
) => {
  logger.info('logDHLResponse called');
  const apiRoot = createApiRoot();
  const actions: OrderUpdateAction[] = [
    {
      action: 'setDeliveryCustomType',
      type: {
        typeId: 'type',
        key: DHL_DELIVERY_TYPE_KEY,
      },
      fields: {
        dhlStatus:
          `${response?.status?.title}(${response?.status?.statusCode})` +
          (response.status?.detail ? `: ${response.status?.detail}` : ''),
        dhlValidationMessages: parseDhlValidationMessages(response),
      },
      deliveryId: delivery.id,
    },
  ];
  if (response.status?.statusCode === 200 && response.items) {
    const label = response.items[0];
    actions.push({
      action: 'addParcelToDelivery',
      deliveryId: delivery.id,
      trackingData: {
        trackingId: label.shipmentNo,
        carrier: 'DHL',
      },
      custom: {
        type: {
          typeId: 'type',
          key: DHL_PARCEL_TYPE_KEY,
        },
        fields: {
          deliveryLabel: label.label?.url,
          customsLabel: label.customsDoc?.url,
          dhlShipmentNumber: label.shipmentNo,
        },
      },
    } as OrderAddParcelToDeliveryAction);
  }
  return apiRoot
    .orders()
    .withId({ ID: order.id })
    .post({
      body: {
        version: order.version,
        actions,
      },
    })
    .execute();
};

const createLabel = async (order: Order, delivery: Delivery) => {
  const settings = await getSettings();
  const api = buildApi();
  try {
    const shipment = mapCommercetoolsOrderToDHLShipment(
      order,
      delivery,
      settings
    );
    logger.info(JSON.stringify(shipment));
    const response = (
      await api.createOrders(
        {
          profile: DHL_DEFAULT_PROFILE,
          shipments: [shipment],
        },
        undefined,
        undefined,
        settings?.onlyAllowValidRoutingCodes ?? false,
        'URL'
      )
    ).data;
    await logDHLResponse(response, order, delivery);
    if (response.status?.statusCode === 200 && response.items) {
      return response.items[0];
    }
    throw new CustomError(
      response.status?.statusCode ?? 500,
      response.status?.detail ?? 'There was an error in handling the request'
    );
  } catch (e: any) {
    if (e instanceof AxiosError) {
      await logDHLResponse(e.response?.data, order, delivery);
      logger.info(JSON.stringify(e.response?.data));
    }
    logger.error(e.message);
    throw e;
  }
};

export const deleteLabel = async (shipmentNumber: string) => {
  const api = buildApi();
  try {
    logger.info(`Will delete label for shipment number ${shipmentNumber}`);
    const response = (
      await api.ordersAccountDelete(DHL_DEFAULT_PROFILE, shipmentNumber)
    ).data;
    if (response.status?.statusCode === 200 && response.items) {
      logger.info(
        `Deleted label for shipment number ${shipmentNumber}. Status is ${response.items[0].sstatus.title}`
      );

      return response.items[0];
    }
    throw new CustomError(
      response.status?.statusCode ?? 500,
      response.status?.detail ?? 'There was an error in handling the request'
    );
  } catch (e: any) {
    if (e instanceof AxiosError) {
      logger.info(JSON.stringify(e.response?.data));
    }
    logger.error(e.message);
    throw e;
  }
};
