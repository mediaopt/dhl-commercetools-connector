import { CountrySelectListType, DHLSettingsType } from '../../types/types';
import Spacings from '@commercetools-uikit/spacings';
import TextField from '@commercetools-uikit/text-field';
import { FormattedMessage } from 'react-intl';
import SelectField from '@commercetools-uikit/select-field';
import countries from 'i18n-iso-countries';
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

const AddressMask = ({ values, handleChange, type }: DHLSettingsType) => {
  const names: Record<string, string> = countries.getNames('en');
  const countrySelect: CountrySelectListType = [];
  Object.keys(names).forEach((name) => {
    const alpha3 = countries.alpha2ToAlpha3(name);
    if (names.hasOwnProperty(name) && alpha3) {
      countrySelect.push({ value: alpha3, label: names[name] });
    }
  });

  return (
    <Spacings.Stack scale="s" alignItems="stretch">
      <Spacings.Inline
        scale="m"
        alignItems="center"
        justifyContent="space-between"
      >
        <TextField
          isRequired
          onChange={handleChange}
          title={<FormattedMessage id="Settings.name1" />}
          value={values.name1}
          name={`${type}.name1`}
        />
        <TextField
          onChange={handleChange}
          title={<FormattedMessage id="Settings.name2" />}
          value={values.name2!}
          name={`${type}.name2`}
        />
        <TextField
          onChange={handleChange}
          title={<FormattedMessage id="Settings.name3" />}
          value={values.name3!}
          name={`${type}.name3`}
        />
      </Spacings.Inline>
      <Spacings.Inline
        scale="m"
        alignItems="center"
        justifyContent="space-between"
      >
        <TextField
          isRequired
          onChange={handleChange}
          title={<FormattedMessage id="Settings.addressStreet" />}
          value={values.addressStreet}
          name={`${type}.addressStreet`}
        />
        <TextField
          onChange={handleChange}
          title={<FormattedMessage id="Settings.addressHouse" />}
          value={values.addressHouse!}
          name={`${type}.addressHouse`}
        />
      </Spacings.Inline>
      <Spacings.Inline
        scale="m"
        alignItems="center"
        justifyContent="space-between"
      >
        <TextField
          onChange={handleChange}
          title={<FormattedMessage id="Settings.postalCode" />}
          value={values.postalCode!}
          name={`${type}.postalCode`}
        />
        <TextField
          isRequired
          onChange={handleChange}
          title={<FormattedMessage id="Settings.city" />}
          value={values.city}
          name={`${type}.city`}
        />
        <SelectField
          isRequired
          onChange={handleChange}
          title={<FormattedMessage id="Settings.country" />}
          value={values.country}
          options={countrySelect}
          name={`${type}.country`}
        />
      </Spacings.Inline>
      <Spacings.Inline
        scale="m"
        alignItems="center"
        justifyContent="space-between"
      >
        <TextField
          onChange={handleChange}
          title={<FormattedMessage id="Settings.contactName" />}
          value={values.contactName!}
          name={`${type}.contactName`}
        />
        <TextField
          onChange={handleChange}
          title={<FormattedMessage id="Settings.email" />}
          value={values.email!}
          name={`${type}.email`}
        />
      </Spacings.Inline>
    </Spacings.Stack>
  );
};

export default AddressMask;
