import { useEffect, useState } from 'react';
import { Formik } from 'formik';

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
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Address from '../address';
import Shipments from '../shipments';
import Errors from '../errors';

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
  const match = useRouteMatch();

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
          <Switch>
            <Route path={`${match.path}/address`}>
              <Address handleChange={handleChange} values={values} />
            </Route>
            <Route path={`${match.path}/shipments`}>
              <Shipments handleChange={handleChange} values={values} />
            </Route>
            <Route path={`${match.path}/errors`}>
              <Errors />
            </Route>
          </Switch>
        </form>
      )}
    </Formik>
  );
};
Settings.displayName = 'Settings Overview';

export default Settings;
