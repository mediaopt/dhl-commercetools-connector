import { FormattedMessage } from 'react-intl';
import Text from '@commercetools-uikit/text';
import CheckboxInput from '@commercetools-uikit/checkbox-input';

import AddressMask from './AddressMask';
import { SubSettingsPagePropType } from '../../types/types';
import SubPageWrapper from '../generic/SubPageWrapper';
import messages from '../welcome/messages';

const Address = ({ values, handleChange }: SubSettingsPagePropType) => {
  return (
    <SubPageWrapper>
      <Text.Headline as="h2" intlMessage={messages.addressSettingsTitle} />
      <AddressMask
        values={values.dispatch}
        handleChange={handleChange}
        type="dispatch"
      />
      <CheckboxInput
        isChecked={values.returnIsDispatch}
        onChange={handleChange}
        value="returnIsDispatch"
        name="returnIsDispatch"
      >
        <FormattedMessage id="Settings.returnIsDispatch" />
      </CheckboxInput>
      {!values.returnIsDispatch && (
        <AddressMask
          values={values.return}
          type="return"
          handleChange={handleChange}
        />
      )}
    </SubPageWrapper>
  );
};
Address.displayName = 'Address Settings';

export default Address;
