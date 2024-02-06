import { SubSettingsPagePropType } from '../../types/types';
import Text from '@commercetools-uikit/text';
import { FormattedMessage } from 'react-intl';
import CheckboxInput from '@commercetools-uikit/checkbox-input';
import SubPageWrapper from '../generic/SubPageWrapper';

const Label = ({ handleChange, values }: SubSettingsPagePropType) => {
  return (
    <SubPageWrapper>
      <Text.Body>
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
    </SubPageWrapper>
  );
};

export default Label;
