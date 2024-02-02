import { lazy } from 'react';

const Errors = lazy(
  () => import('./errors' /* webpackChunkName: "settings" */)
);

export default Errors;
