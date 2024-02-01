import { DhlAddress, SettingsFormDataType } from './types/types';

export const GRAPHQL_CUSTOMOBJECT_CONTAINER_NAME =
  'dhl-commercetools-connector';

export const GRAPHQL_CUSTOMOBJECT_KEY_NAME = 'settings';

const emptyAddress: DhlAddress = {
  name1: '',
  name2: '',
  name3: '',
  addressStreet: '',
  addressHouse: '',
  postalCode: '',
  city: '',
  country: '',
  contactName: '',
  email: '',
};

export const CUSTOM_OBJECT_DEFAULT_VALUES: SettingsFormDataType = {
  dispatch: emptyAddress,
  return: emptyAddress,
  returnIsDispatch: true,
};
