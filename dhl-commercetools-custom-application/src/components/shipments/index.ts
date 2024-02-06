import { lazy } from 'react';

const Shipments = lazy(
  () => import('./shipments' /* webpackChunkName: "shipments" */)
);

export default Shipments;
