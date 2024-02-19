import { SettingsFormDataType } from './types/index.types';
import { Shipper } from './parcel-de-shipping';

export const GRAPHQL_CUSTOMOBJECT_CONTAINER_NAME =
  'dhl-commercetools-connector';
export const DHL_SHIPPING_METHOD_DHL_PAKET = 'dhl-shipping-method-dhl-paket';
export const DHL_SHIPPING_METHOD_DHL_PAKET_INTERNATIONAL =
  'dhl-shipping-method-dhl-paket-international';
export const DHL_SHIPPING_METHOD_WARENPOST = 'dhl-shipping-method-warenpost';
export const DHL_SHIPPING_METHOD_WARENPOST_INTERNATIONAL =
  'dhl-shipping-method-warenpost-international';
export const DHL_SHIPPING_METHOD_DHL_EUROPAKET =
  'dhl-shipping-method-dhl-europaket';

export const DHL_DEFAULT_PROFILE = 'STANDARD_GRUPPENPROFIL';

export const DHL_PRODUCTS = {
  [DHL_SHIPPING_METHOD_DHL_PAKET]: 'V01PAK',
  [DHL_SHIPPING_METHOD_DHL_PAKET_INTERNATIONAL]: 'V53WPAK',
  [DHL_SHIPPING_METHOD_DHL_EUROPAKET]: 'V54EPAK',
  [DHL_SHIPPING_METHOD_WARENPOST]: 'V62WP',
  [DHL_SHIPPING_METHOD_WARENPOST_INTERNATIONAL]: 'V66WPI',
};

export const GRAPHQL_CUSTOMOBJECT_KEY_NAME = 'settings';

const emptyAddress: Shipper = {
  name1: '',
  name2: '',
  name3: '',
  addressStreet: '',
  addressHouse: '',
  postalCode: '',
  city: '',
  country: 'DEU',
  contactName: '',
  email: '',
};

export const CUSTOM_OBJECT_DEFAULT_VALUES: SettingsFormDataType = {
  dispatch: emptyAddress,
  return: emptyAddress,
  returnIsDispatch: true,
  onlyAllowValidRoutingCodes: false,
  weight: {
    attribute: '',
    unit: 'kg',
    fallbackWeight: 1,
  },
};

export const IDENT_CHECK_MINIMUM_AGE_ENUM = {
  None: 'none',
  A16: 'A16',
  A18: 'A18',
};
