import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import {
  CUSTOM_OBJECT_DEFAULT_VALUES,
  GRAPHQL_CUSTOMOBJECT_CONTAINER_NAME,
  GRAPHQL_CUSTOMOBJECT_KEY_NAME,
} from '../constants';

const CART_UPDATE_EXTENSION_KEY = 'myconnector-cartUpdateExtension';
const CART_DISCOUNT_TYPE_KEY = 'myconnector-cartDiscountType';

export async function createCartUpdateExtension(
  apiRoot: ByProjectKeyRequestBuilder,
  applicationUrl: string
): Promise<void> {
  const {
    body: { results: extensions },
  } = await apiRoot
    .extensions()
    .get({
      queryArgs: {
        where: `key = "${CART_UPDATE_EXTENSION_KEY}"`,
      },
    })
    .execute();

  if (extensions.length > 0) {
    const extension = extensions[0];

    await apiRoot
      .extensions()
      .withKey({ key: CART_UPDATE_EXTENSION_KEY })
      .delete({
        queryArgs: {
          version: extension.version,
        },
      })
      .execute();
  }

  await apiRoot
    .extensions()
    .post({
      body: {
        key: CART_UPDATE_EXTENSION_KEY,
        destination: {
          type: 'HTTP',
          url: applicationUrl,
        },
        triggers: [
          {
            resourceTypeId: 'cart',
            actions: ['Update'],
          },
        ],
      },
    })
    .execute();
}

export async function deleteCartUpdateExtension(
  apiRoot: ByProjectKeyRequestBuilder
): Promise<void> {
  const {
    body: { results: extensions },
  } = await apiRoot
    .extensions()
    .get({
      queryArgs: {
        where: `key = "${CART_UPDATE_EXTENSION_KEY}"`,
      },
    })
    .execute();

  if (extensions.length > 0) {
    const extension = extensions[0];

    await apiRoot
      .extensions()
      .withKey({ key: CART_UPDATE_EXTENSION_KEY })
      .delete({
        queryArgs: {
          version: extension.version,
        },
      })
      .execute();
  }
}

export async function createCustomCartDiscountType(
  apiRoot: ByProjectKeyRequestBuilder
): Promise<void> {
  const {
    body: { results: types },
  } = await apiRoot
    .types()
    .get({
      queryArgs: {
        where: `key = "${CART_DISCOUNT_TYPE_KEY}"`,
      },
    })
    .execute();

  if (types.length > 0) {
    const type = types[0];

    await apiRoot
      .types()
      .withKey({ key: CART_DISCOUNT_TYPE_KEY })
      .delete({
        queryArgs: {
          version: type.version,
        },
      })
      .execute();
  }

  await apiRoot
    .types()
    .post({
      body: {
        key: CART_DISCOUNT_TYPE_KEY,
        name: {
          en: 'Custom type to store a string',
        },
        resourceTypeIds: ['cart-discount'],
        fieldDefinitions: [
          {
            type: {
              name: 'String',
            },
            name: 'customCartField',
            label: {
              en: 'Custom cart field',
            },
            required: false,
          },
        ],
      },
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
