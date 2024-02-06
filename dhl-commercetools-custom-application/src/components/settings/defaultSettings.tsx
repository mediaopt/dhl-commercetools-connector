import { DhlAddress, SettingsFormDataType } from '../../types/types';

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

export const DEFAULT_SETTINGS: SettingsFormDataType = {
  dispatch: emptyAddress,
  return: emptyAddress,
  returnIsDispatch: true,
  onlyAllowValidRoutingCodes: false,
};
