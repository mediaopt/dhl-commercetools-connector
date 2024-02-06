import { lazy } from 'react';

const Address = lazy(
  () => import('./address' /* webpackChunkName: "address" */)
);

export default Address;
