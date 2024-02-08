import { ChangeEvent } from 'react';

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

export type DHLError = {
  timestamp: number;
  level: 'info' | 'warning' | 'error';
  message: string;
  id: string;
};

export type SettingsFormDataType = {
  return: DhlAddress;
  dispatch: DhlAddress;
  returnIsDispatch: boolean;
  onlyAllowValidRoutingCodes: boolean;
  weight: {
    attribute?: string;
    unit: 'g' | 'kg';
    fallbackWeight: number;
  };
  errors?: Array<DHLError>;
};

type HandleChangeType = {
  (e: ChangeEvent<any>): void;
  <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any>
    ? void
    : (e: string | ChangeEvent<any>) => void;
};

export type DHLSettingsType = {
  values: DhlAddress;
  type: 'dispatch' | 'return';
  handleChange: HandleChangeType;
};

export type SubSettingsPagePropType = {
  values: SettingsFormDataType;
  handleChange: HandleChangeType;
};

export type OnlySettingsSubPageType = {
  values: SettingsFormDataType;
};

export type FetchedCustomObjectType = {
  value: SettingsFormDataType;
  version: number;
};

export type ApollonFetchedCustomObjectType = {
  data: {
    createOrUpdateCustomObject: FetchedCustomObjectType;
  };
};

export type CountrySelectListType = Array<{ label: string; value: string }>;
