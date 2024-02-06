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

export type DHLError = {
  timestamp: number;
  level: 'info' | 'warning' | 'error';
  message: string;
  id: string;
};

export type SettingsFormDataType = {
  return: Shipper;
  dispatch: Shipper;
  returnIsDispatch: boolean;
  errors?: Array<DHLError>;
};

export type ShippingMethodDHLCustomFields = {
  ekp: string;
  product: DHLProduct;
  participation: string;
};

export type DHLProduct = 'V01PAK' | 'V53WPAK' | 'V54EPAK' | 'V62WP' | 'V66WPI';
