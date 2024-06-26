import { PERMISSIONS } from './src/constants';

/**
 * @type {import('@commercetools-frontend/application-config').ConfigOptionsForCustomApplication}
 */
const config = {
  name: 'DHL Produkte & Services Commercetools',
  entryPointUriPath: '${env:ENTRY_POINT_URI_PATH}',
  cloudIdentifier: '${env:CLOUD_IDENTIFIER}',
  env: {
    development: {
      initialProjectKey: 'dhl-dev',
    },
    production: {
      applicationId: '${env:CUSTOM_APPLICATION_ID}',
      url: '${env:APPLICATION_URL}',
    },
  },
  oAuthScopes: {
    view: ['view_key_value_documents'],
    manage: ['manage_key_value_documents'],
  },
  icon: '${path:@commercetools-frontend/assets/application-icons/rocket.svg}',
  mainMenuLink: {
    defaultLabel: 'DHL Produkte & Services Commercetools',
    labelAllLocales: [],
    permissions: [PERMISSIONS.View],
  },
  submenuLinks: [
    {
      uriPath: 'settings/address',
      defaultLabel: 'DHL Address Settings',
      labelAllLocales: [],
      permissions: [PERMISSIONS.Manage],
    },
    {
      uriPath: 'settings/shipments',
      defaultLabel: 'DHL Shipment Settings',
      labelAllLocales: [],
      permissions: [PERMISSIONS.Manage],
    },
  ],
};

export default config;
