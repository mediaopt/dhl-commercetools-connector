import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import Spacings from '@commercetools-uikit/spacings';
import PrimaryButton from '@commercetools-uikit/primary-button';
import Text from '@commercetools-uikit/text';
import TextField from "@commercetools-uikit/text-field";
import LocalizedMultilineTextField from '@commercetools-uikit/localized-multiline-text-field';

import {
  useFetchLanguages,
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


const Settings = () => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isLanguageReady, setIsLanguageReady] = useState<boolean>(false);
  const [customObjectVersion, setCustomObjectVersion] = useState<number>();
  const [settingsObject, setSettingsObject] =
    useState<SettingsFormDataType>(DEFAULT_SETTINGS);
  const { customObject, error, loading } = useFetchSettings(
    GRAPHQL_CUSTOMOBJECT_KEY_NAME,
    GRAPHQL_CUSTOMOBJECT_CONTAINER_NAME
  );
  const { languages, languageError, languageLoading } = useFetchLanguages();
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

  const setMissingLanguages = () => {
    const filteredLanguages = languages?.filter(
      (lang) => !Object.keys(settingsObject.name).includes(lang)
    );
    filteredLanguages.forEach((lang) => {
      settingsObject.name[lang] = '';
    });
    setSettingsObject(settingsObject);
    setIsReady(true);
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
      setIsLanguageReady(true);
    }
  }, [customObject, error, loading]);

  useEffect(() => {
    if (languageLoading || !isLanguageReady) {
      return;
    }
    if (languageError) {
      console.error(languageError);
      return;
    }
    setMissingLanguages();
  }, [languages, languageLoading, languageError, isLanguageReady]);

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
            <Spacings.Stack scale="xs" alignItems="stretch">
              <Text.Body>PayPal Button</Text.Body>
              <Spacings.Inline
                scale="m"
                alignItems="center"
                justifyContent="space-between"
              >
                <TextField
                  onChange={handleChange}
                  title="Merchant ID"
                  value={''}
                  name="merchantId"
                />
                <LocalizedMultilineTextField
                  title="Payment description"
                  name="paymentDescription"
                  value={values.name}
                  selectedLanguage="en"
                  onChange={handleChange}
                />
              </Spacings.Inline>
            </Spacings.Stack>
            <Spacings.Inline
              scale="s"
              alignItems="flex-start"
              justifyContent="flex-start"
            >
              <PrimaryButton label="save" type="submit" />
              <PrimaryButton
                label="reset current settings"
                onClick={() => {
                  saveSettings({
                    ...values,
                  });
                }}
                tone="critical"
              />
            </Spacings.Inline>
          </Spacings.Stack>
        </form>
      )}
    </Formik>
  );
};
Settings.displayName = 'Settings Overview';

export default Settings;
