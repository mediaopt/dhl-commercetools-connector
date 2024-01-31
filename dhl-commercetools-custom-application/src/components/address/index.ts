import { lazy } from 'react';

const Address = lazy(
  () => import('./address' /* webpackChunkName: "settings" */)
);

export default Address;
