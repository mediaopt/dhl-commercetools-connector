// Make sure to import the helper functions from the `ssr` entry point.
import { entryPointUriPathToPermissionKeys } from '@commercetools-frontend/application-shell/ssr';

export const entryPointUriPath =
  typeof window === 'undefined'
    ? process.env.ENTRY_POINT_URI_PATH
    : (window as any).app.entryPointUriPath ?? 'dhl-connector';

export const PERMISSIONS = entryPointUriPathToPermissionKeys(entryPointUriPath);

export const GRAPHQL_CUSTOMOBJECT_CONTAINER_NAME =
  'dhl-commercetools-connector';

export const GRAPHQL_CUSTOMOBJECT_KEY_NAME = 'settings';
