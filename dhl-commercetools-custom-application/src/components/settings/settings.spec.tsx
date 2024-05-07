import {
  screen,
  mapResourceAccessToAppliedPermissions,
  type TRenderAppWithReduxOptions,
} from '@commercetools-frontend/application-shell/test-utils';
// import userEvent from '@testing-library/user-event';
import { renderApplicationWithRedux } from '../../test-utils';
import { entryPointUriPath, PERMISSIONS } from '../../constants';
import ApplicationRoutes from '../../routes';
/*import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import FETCH_SETTINGS from '../../queries/FetchCustomObjectQuery.graphql';
import { useSetSettings } from '../connector-hooks/use-customObject-connector';
import { useMutation } from '@apollo/client';
import SET_SETTINGS from '../../mutations/UpdateCustomObjectMutation.graphql';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { FetchedCustomObjectType } from '../../types/types';*/

jest.mock('../connector-hooks/use-customObject-connector', () => ({
  useFetchSettings: () => {
    return {
      customObject: {},
      loading: false,
      error: undefined,
    };
  },
  useSetSettings: () => {
    const setSettingsFunc = () => {
      return {
        data: {
          createOrUpdateCustomObject: {
            version: 1,
            data: {},
          },
        },
      };
    };

    return [setSettingsFunc];
  },
}));

const renderApp = (options: Partial<TRenderAppWithReduxOptions> = {}) => {
  const route = options.route || `/my-project/${entryPointUriPath}/settings`;
  renderApplicationWithRedux(<ApplicationRoutes />, {
    route,
    project: {
      allAppliedPermissions: mapResourceAccessToAppliedPermissions([
        PERMISSIONS.View,
      ]),
    },
    ...options,
  });
};

/*
const mockServer = setupServer();
afterEach(() => mockServer.resetHandlers());*/
/*beforeAll(() =>
  mockServer.listen({
    onUnhandledRequest: 'error',
  })
);

afterAll(() => mockServer.close());

beforeEach(() => {
  mockServer.use(
    graphql.query(FETCH_SETTINGS, (_req, res, ctx) => {
      return res(
        ctx.data({
          customObject: {},
          loading: false,
          error: undefined,
        })
      );
    })
  );
});*/

it('should render welcome page', async () => {
  renderApp();
  await screen.findByRole('form');
});
