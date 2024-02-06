import { lazy } from 'react';

const Shipments = lazy(
  () => import('./shipments' /* webpackChunkName: "label" */)
);

export default Shipments;
