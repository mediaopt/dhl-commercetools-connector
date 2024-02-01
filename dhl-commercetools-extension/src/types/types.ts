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
