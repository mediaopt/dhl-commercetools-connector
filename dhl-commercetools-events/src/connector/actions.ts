import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import {
  FieldDefinition,
  TypeAddFieldDefinitionAction,
  TypeDraft,
} from '@commercetools/platform-sdk';
import {
  CUSTOM_OBJECT_DEFAULT_VALUES,
  GRAPHQL_CUSTOMOBJECT_CONTAINER_NAME,
  GRAPHQL_CUSTOMOBJECT_KEY_NAME,
} from '../constants';

const DELIVERY_ADDED_SUBSCRIPTION_KEY =
  'dhl-connector-deliveryAddedSubscription';

const DHL_PARCEL_TYPE_KEY = 'dhl-parcel-type';
const DHL_SHIPPING_METHOD_TYPE_KEY = 'dhl-shipping-method-type';

export async function createDeliveryAddedSubscription(
  apiRoot: ByProjectKeyRequestBuilder,
  topicName: string,
  projectId: string
): Promise<void> {
  await deleteDeliveryAddedSubscription(apiRoot);

  await apiRoot
    .subscriptions()
    .post({
      body: {
        key: DELIVERY_ADDED_SUBSCRIPTION_KEY,
        destination: {
          type: 'GoogleCloudPubSub',
          topic: topicName,
          projectId,
        },
        messages: [
          {
            resourceTypeId: 'order',
            types: ['DeliveryAdded'],
          },
        ],
      },
    })
    .execute();
}

export async function deleteDeliveryAddedSubscription(
  apiRoot: ByProjectKeyRequestBuilder
): Promise<void> {
  const {
    body: { results: subscriptions },
  } = await apiRoot
    .subscriptions()
    .get({
      queryArgs: {
        where: `key = "${DELIVERY_ADDED_SUBSCRIPTION_KEY}"`,
      },
    })
    .execute();

  if (subscriptions.length > 0) {
    const subscription = subscriptions[0];

    await apiRoot
      .subscriptions()
      .withKey({ key: DELIVERY_ADDED_SUBSCRIPTION_KEY })
      .delete({
        queryArgs: {
          version: subscription.version,
        },
      })
      .execute();
  }
}

export const createParcelCustomType = async (
  apiRoot: ByProjectKeyRequestBuilder
) => {
  const customType = {
    key: DHL_PARCEL_TYPE_KEY,
    name: {
      en: 'Custom DHL parcel type',
    },
    resourceTypeIds: ['order-parcel'],
    fieldDefinitions: [
      {
        name: `deliveryLabel`,
        label: {
          en: `DHL Delivery Label`,
          de: 'DHL Versandlabel',
        },
        type: {
          name: 'String',
        },
        required: false,
      } as FieldDefinition,
      {
        name: `customsLabel`,
        label: {
          en: `DHL Customs Label (for International Shipments)`,
          de: 'DHL Zollinhaltserklärung (für internationale Sendungen)',
        },
        type: {
          name: 'String',
        },
        required: false,
      } as FieldDefinition,
    ],
  };
  await addOrUpdateCustomType(apiRoot, customType);
};

export const createShippingMethodCustomType = async (
  apiRoot: ByProjectKeyRequestBuilder
) => {
  const customType = {
    key: DHL_SHIPPING_METHOD_TYPE_KEY,
    name: {
      en: 'Custom DHL shipping method type',
    },
    resourceTypeIds: ['shipping-method'],
    fieldDefinitions: [
      {
        name: `ekp`,
        label: {
          en: `EKP`,
          de: 'EKP',
        },
        type: {
          name: 'String',
        },
        required: true,
      } as FieldDefinition,
      {
        name: `product`,
        label: {
          en: `Product`,
          de: 'Product',
        },
        type: {
          name: 'Enum',
          values: [
            {
              key: 'V01PAK',
              label: 'DHL Paket',
            },
            {
              key: 'V53WPAK',
              label: 'DHL Paket International',
            },
            {
              key: 'V54EPAK',
              label: 'DHL Europaket',
            },
            {
              key: 'V62WP',
              label: 'Warenpost',
            },
            {
              key: 'V66WPI',
              label: 'Warenpost International',
            },
          ],
        },
        required: true,
      } as FieldDefinition,
      {
        name: `participation`,
        label: {
          en: `Contract Participation`,
          de: 'Teilnahme',
        },
        type: {
          name: 'String',
        },
        required: true,
      } as FieldDefinition,
    ],
  };
  await addOrUpdateCustomType(apiRoot, customType);
};

async function addOrUpdateCustomType(
  apiRoot: ByProjectKeyRequestBuilder,
  customType: TypeDraft
): Promise<void> {
  const {
    body: { results: types },
  } = await apiRoot
    .types()
    .get({
      queryArgs: {
        where: `key = "${customType.key}"`,
      },
    })
    .execute();
  if (types.length > 0) {
    const type = types[0];
    const updates = (customType.fieldDefinitions ?? [])
      .filter(
        (newFieldDefinition: FieldDefinition): boolean =>
          !type.fieldDefinitions.find(
            (existingFieldDefinition: FieldDefinition): boolean =>
              newFieldDefinition.name === existingFieldDefinition.name
          )
      )
      .map((fieldDefinition: FieldDefinition): TypeAddFieldDefinitionAction => {
        return {
          action: 'addFieldDefinition',
          fieldDefinition: fieldDefinition,
        };
      });
    if (updates.length === 0) {
      return;
    }
    await apiRoot
      .types()
      .withKey({ key: customType.key })
      .post({
        body: {
          version: type.version,
          actions: updates,
        },
      })
      .execute();
    return;
  }
  await apiRoot
    .types()
    .post({
      body: customType,
    })
    .execute();
}

export async function createAndSetCustomObject(
  apiRoot: ByProjectKeyRequestBuilder
): Promise<void> {
  const existingSettingsObject = await apiRoot
    .customObjects()
    .withContainerAndKey({
      container: GRAPHQL_CUSTOMOBJECT_CONTAINER_NAME,
      key: GRAPHQL_CUSTOMOBJECT_KEY_NAME,
    })
    .get()
    .execute();
  if (existingSettingsObject.body.value) {
    return;
  }

  await apiRoot
    .customObjects()
    .post({
      body: {
        container: GRAPHQL_CUSTOMOBJECT_CONTAINER_NAME,
        key: GRAPHQL_CUSTOMOBJECT_KEY_NAME,
        value: CUSTOM_OBJECT_DEFAULT_VALUES,
      },
    })
    .execute();
}
