import { SubSettingsPagePropType } from '../../types/types';
import Text from '@commercetools-uikit/text';
import { FormattedMessage } from 'react-intl';
import CheckboxInput from '@commercetools-uikit/checkbox-input';
import SubPageWrapper from '../generic/SubPageWrapper';
import Spacings from '@commercetools-uikit/spacings';
import TextField from '@commercetools-uikit/text-field';
import NumberField from '@commercetools-uikit/number-field';
import SelectField from '@commercetools-uikit/select-field';

const Label = ({ handleChange, values }: SubSettingsPagePropType) => {
  return (
    <SubPageWrapper>
      <Spacings.Stack scale="xs" alignItems="stretch">
        <Text.Body isBold>
          <FormattedMessage id="Settings.labelSettings" />
        </Text.Body>
        <CheckboxInput
          isChecked={values.onlyAllowValidRoutingCodes}
          onChange={handleChange}
          value="onlyAllowValidRoutingCodes"
          name="onlyAllowValidRoutingCodes"
        >
          <FormattedMessage id="Settings.onlyAllowValidRoutingCodes" />
        </CheckboxInput>
      </Spacings.Stack>
      <Spacings.Stack scale="xs" alignItems="stretch">
        <Text.Body isBold>
          <FormattedMessage id="Settings.weight" />
        </Text.Body>
        <Spacings.Inline
          scale="m"
          alignItems="flex-end"
          justifyContent="space-between"
        >
          <TextField
            onChange={handleChange}
            title={<FormattedMessage id="Settings.weightAttribute" />}
            value={values.weight.attribute}
            name="weight.attribute"
          />
          <SelectField
            onChange={handleChange}
            title={<FormattedMessage id="Settings.weightUnit" />}
            value={values.weight.unit}
            options={[
              { value: 'g', label: 'g' },
              { value: 'kg', label: 'kg' },
            ]}
            name="weight.unit"
          />
          <NumberField
            onChange={handleChange}
            title={<FormattedMessage id="Settings.weightFallback" />}
            value={values.weight.fallbackWeight}
            name="weight.fallbackWeight"
          />
        </Spacings.Inline>
      </Spacings.Stack>
    </SubPageWrapper>
  );
};

export default Label;
