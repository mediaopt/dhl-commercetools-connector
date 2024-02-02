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

const date: Date = new Date();

export const DEFAULT_SETTINGS: SettingsFormDataType = {
  dispatch: emptyAddress,
  return: emptyAddress,
  returnIsDispatch: true,
  onlyAllowValidRoutingCodes: false,
  errors: [
    {
      timestamp: date,
      level: 'warning',
      message: 'Leitcode falsch',
      id: 'e199c04e-7a69-4704-b44a-4c868218a62c',
    },
    {
      id: '5c36e050-03c4-4683-91bd-72436481745c',
      timestamp: date,
      level: 'error',
      message: 'Labeldruck fehlgeschlagen',
    },
    {
      id: '3eb9904c-eef4-4a19-a655-e7bce1d412db',
      timestamp: date,
      level: 'info',
      message: 'API Error',
    },
  ],
};
