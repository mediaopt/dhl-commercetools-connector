import { BaseAddress } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';
import { SettingsFormDataType } from '../../types/types';

const emptyAddress: BaseAddress = {
  streetName: '',
  streetNumber: '',
  additionalStreetInfo: '',
  postalCode: '',
  city: '',
  state: '',
  country: '',
  company: '',
  department: '',
  pOBox: '',
  phone: '',
};

export const DEFAULT_SETTINGS: SettingsFormDataType = {
  dispatch: emptyAddress,
  return: emptyAddress,
  returnIsDispatch: true,
};
