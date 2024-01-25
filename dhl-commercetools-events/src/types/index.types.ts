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

export type DhlAddress = {
  name1: string;
  name2?: string;
  name3?: string;
  addressStreet: string;
  addressHouse?: string;
  postalCode?: string;
  city: string;
  country: string;
  contactName?: string;
  email?: string;
};

export type SettingsFormDataType = {
  return: DhlAddress;
  dispatch: DhlAddress;
  returnIsDispatch: boolean;
};

export type ShippingMethodDHLCustomFields = {
  ekp: string;
  product: DHLProduct;
  participation: string;
};

export type DHLProduct = 'V01PAK' | 'V53WPAK' | 'V54EPAK' | 'V62WP' | 'V66WPI';
