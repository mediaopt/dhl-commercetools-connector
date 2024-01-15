import { ChangeEvent } from 'react';
import { BaseAddress } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';

export type SettingsFormDataType = {
  return: BaseAddress;
  dispatch: BaseAddress;
  returnIsDispatch: boolean;
};

export type DHLSettingsType = {
  values: BaseAddress;
  type: 'dispatch' | 'return';
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
