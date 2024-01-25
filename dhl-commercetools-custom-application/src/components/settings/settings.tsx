import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Formik } from 'formik';
import Spacings from '@commercetools-uikit/spacings';
import PrimaryButton from '@commercetools-uikit/primary-button';
import Text from '@commercetools-uikit/text';
import CheckboxInput from '@commercetools-uikit/checkbox-input';

import {
  useFetchSettings,
  useSetSettings,
} from '../connector-hooks/use-customObject-connector';

import {
  ApollonFetchedCustomObjectType,
  SettingsFormDataType,
} from '../../types/types';
import {
  GRAPHQL_CUSTOMOBJECT_CONTAINER_NAME,
  GRAPHQL_CUSTOMOBJECT_KEY_NAME,
} from '../../constants';
import { DEFAULT_SETTINGS } from './defaultSettings';
import AddressMask from './AddressMask';
import messages from '../welcome/messages';

const Settings = () => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [customObjectVersion, setCustomObjectVersion] = useState<number>();
  const [settingsObject, setSettingsObject] =
    useState<SettingsFormDataType>(DEFAULT_SETTINGS);
  const { customObject, error, loading } = useFetchSettings(
    GRAPHQL_CUSTOMOBJECT_KEY_NAME,
    GRAPHQL_CUSTOMOBJECT_CONTAINER_NAME
  );
  const [setSettingsFunc] = useSetSettings();

  const saveSettings = (values: SettingsFormDataType) => {
    // @ts-ignore
    setSettingsFunc({
      variables: {
        draftOfCustomObject: {
          container: GRAPHQL_CUSTOMOBJECT_CONTAINER_NAME,
          key: GRAPHQL_CUSTOMOBJECT_KEY_NAME,
          version: customObjectVersion,
          value: JSON.stringify(values),
        },
      },
    }).then((result: ApollonFetchedCustomObjectType) => {
      setCustomObjectVersion(result.data.createOrUpdateCustomObject.version);
      setSettingsObject(result.data.createOrUpdateCustomObject.value);
    });
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    if (error) {
      console.error(error);
    } else {
      setCustomObjectVersion(customObject.version);
      setSettingsObject({ ...DEFAULT_SETTINGS, ...customObject.value });
      setIsReady(true);
    }
  }, [customObject, error, loading]);

  if (!isReady) {
    return <></>;
  }

  return (
    <Formik
      enableReinitialize
      initialValues={settingsObject}
      onSubmit={(values) => {
        saveSettings(values);
      }}
    >
      {({ values, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Spacings.Stack alignItems="stretch" scale="xl">
            <Spacings.Stack scale="xl" alignItems="stretch">
              <Text.Headline intlMessage={messages.addressSettingsTitle} />
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
            </Spacings.Stack>
            <Spacings.Inline
              scale="s"
              alignItems="flex-start"
              justifyContent="flex-start"
            >
              <PrimaryButton label="save" type="submit" />
            </Spacings.Inline>
          </Spacings.Stack>
        </form>
      )}
    </Formik>
  );
};
Settings.displayName = 'Settings Overview';

export default Settings;
