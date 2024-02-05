import {
  Delivery,
  Order,
  OrderAddParcelToDeliveryAction,
} from '@commercetools/platform-sdk';
import { logger } from '../utils/logger.utils';
import { createApiRoot } from '../client/create.client';
import CustomError from '../errors/custom.error';
import {
  Configuration,
  ResponseItem,
  ShipmentsAndLabelsApiFactory,
} from '../parcel-de-shipping';
import { AxiosError } from 'axios';
import { mapCommercetoolsOrderToDHLShipment } from '../utils/map.utils';
import {
  SettingsFormDataType,
  ShippingMethodDHLCustomFields,
} from '../types/index.types';

const DHL_PARCEL_API_KEY = 'eg391xkOwa007rDuCVJqAo2wzG4pmWI5';

async function getOrderByDeliveryId(deliveryId: string) {
  const apiRoot = await createApiRoot();
  const orders = (
    await apiRoot
      .orders()
      .get({
        queryArgs: {
          where: `shippingInfo(deliveries(id = "${deliveryId}"))`,
          expand: 'shippingInfo.shippingMethod',
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

async function storeLabelForOrder(
  order: Order,
  delivery: Delivery,
  label: ResponseItem
) {
  const apiRoot = createApiRoot();
  await apiRoot
    .orders()
    .withId({ ID: order.id })
    .post({
      body: {
        actions: [
          {
            action: 'addParcelToDelivery',
            deliveryId: delivery.id,
            trackingData: {
              trackingId: label.shipmentNo,
              carrier: 'DHL',
            },
            custom: {
              type: {
                typeId: 'type',
                key: 'dhl-parcel-type',
              },
              fields: {
                deliveryLabel: label.label?.url,
                customsLabel: label.customsDoc?.url,
              },
            },
          } as OrderAddParcelToDeliveryAction,
        ],

        version: order.version,
      },
    })
    .execute();
}

export const handleDeliveryAddedMessage = async (delivery: Delivery) => {
  logger.info(`Got Delivery with id ${delivery.id}`);
  const order = await getOrderByDeliveryId(delivery.id);
  logger.info(`Got Order with id ${order.id}`);
  var shippingMethod = order.shippingInfo?.shippingMethod?.obj;
  var dhlCustomFields = shippingMethod?.custom
    ?.fields as ShippingMethodDHLCustomFields;
  if (
    !dhlCustomFields.product ||
    !dhlCustomFields.ekp ||
    !dhlCustomFields.participation
  ) {
    return;
  }
  const label = await createLabel(order, delivery);
  await storeLabelForOrder(order, delivery, label);
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

const createLabel = async (order: Order, delivery: Delivery) => {
  const settings = await getSettings();
  const api = ShipmentsAndLabelsApiFactory(
    {
      username: process.env.DHL_GKP_USERNAME,
      password: process.env.DHL_GKP_PASSWORD,
      apiKey: DHL_PARCEL_API_KEY,
    } as Configuration,
    process.env.DHL_PARCEL_ENVIRONMENT === 'SANDBOX'
      ? 'https://api-sandbox.dhl.com/parcel/de/shipping/v2'
      : undefined
  );
  try {
    const response = (
      await api.createOrders(
        {
          profile: 'STANDARD_GRUPPENPROFIL',
          shipments: [
            mapCommercetoolsOrderToDHLShipment(order, delivery, settings),
          ],
        },
        undefined,
        undefined,
        settings?.onlyAllowValidRoutingCodes ?? false,
        'URL'
      )
    ).data;
    if (response.status?.statusCode === 200 && response.items) {
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
