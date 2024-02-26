import {
  CustomsDetailsShippingConditionsEnum,
  Shipper,
  VASVisualCheckOfAgeEnum,
  WeightUomEnum,
} from '../parcel-de-shipping';
import { DHL_PRODUCTS } from '../constants';

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
    attribute?: string;
    unit: WeightUomEnum;
    fallbackWeight: number;
  };
};

export type ShippingMethodDHLCustomFields = {
  ekp: string;
  participation: string;
  shippingConditions?: CustomsDetailsShippingConditionsEnum;
  additionalInsurance?: boolean;
  identCheckMinimumAge?: '' | VASVisualCheckOfAgeEnum;
};

export type DHLShippingMethodType = keyof typeof DHL_PRODUCTS;
export type DHLProduct = 'V01PAK' | 'V53WPAK' | 'V54EPAK' | 'V62WP' | 'V66WPI';
