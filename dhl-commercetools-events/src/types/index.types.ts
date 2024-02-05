import { Shipper } from '../parcel-de-shipping';

export type Message = {
  code: string;
  message: string;
  referencedBy: string;
};

export type ValidatorCreator = (
  path: string[],
  message: Message,
  overrideConfig?: object
) => [string[], [[(o: object) => boolean, string, [object]]]];

export type ValidatorFunction = (o: object) => boolean;

export type Wrapper = (
  validator: ValidatorFunction
) => (value: object) => boolean;

export type SettingsFormDataType = {
  return: Shipper;
  dispatch: Shipper;
  returnIsDispatch: boolean;
  onlyAllowValidRoutingCodes: boolean;
  weight: {
    attribute: string;
    unit: 'g' | 'kg';
    fallbackWeight: number;
  };
};

export type ShippingMethodDHLCustomFields = {
  ekp: string;
  product: DHLProduct;
  participation: string;
};

export type DHLProduct = 'V01PAK' | 'V53WPAK' | 'V54EPAK' | 'V62WP' | 'V66WPI';
