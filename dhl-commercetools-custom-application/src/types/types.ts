import { ChangeEvent } from 'react';
import { LocalizedString } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';

export type SettingsFormDataType = {
  name: LocalizedString;
};



export type DHLSettingsType = {
  values: SettingsFormDataType;
  handleChange: {
    (e: ChangeEvent<any>): void;
    <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any>
      ? void
      : (e: string | ChangeEvent<any>) => void;
  };
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
