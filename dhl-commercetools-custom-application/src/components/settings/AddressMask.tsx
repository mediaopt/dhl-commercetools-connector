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
    if (names.hasOwnProperty(name)) {
      countrySelect.push({ value: name, label: names[name] });
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
          onChange={handleChange}
          title={<FormattedMessage id="Settings.streetName" />}
          value={values.streetName!}
          name={`${type}.streetName`}
        />
        <TextField
          onChange={handleChange}
          title={<FormattedMessage id="Settings.streetNumber" />}
          value={values.streetNumber!}
          name={`${type}.streetNumber`}
        />
        <TextField
          onChange={handleChange}
          title={<FormattedMessage id="Settings.additionalStreetInfo" />}
          value={values.additionalStreetInfo!}
          name={`${type}.additionalStreetInfo`}
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
          onChange={handleChange}
          title={<FormattedMessage id="Settings.city" />}
          value={values.city!}
          name={`${type}.city`}
        />
        <TextField
          onChange={handleChange}
          title={<FormattedMessage id="Settings.state" />}
          value={values.state!}
          name={`${type}.state`}
        />
        <SelectField
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
          title={<FormattedMessage id="Settings.company" />}
          value={values.company!}
          name={`${type}.company`}
        />
        <TextField
          onChange={handleChange}
          title={<FormattedMessage id="Settings.department" />}
          value={values.department!}
          name={`${type}.department`}
        />
      </Spacings.Inline>
      <Spacings.Inline
        scale="m"
        alignItems="center"
        justifyContent="space-between"
      >
        <TextField
          onChange={handleChange}
          title={<FormattedMessage id="Settings.pOBox" />}
          value={values.pOBox!}
          name={`${type}.pOBox`}
        />
        <TextField
          onChange={handleChange}
          title={<FormattedMessage id="Settings.phone" />}
          value={values.phone!}
          name={`${type}.phone`}
        />
      </Spacings.Inline>
    </Spacings.Stack>
  );
};

export default AddressMask;
