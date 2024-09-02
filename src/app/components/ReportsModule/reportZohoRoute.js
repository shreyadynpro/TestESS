// reportroutemodule.js
import Loadable from '../Loadable';
import { lazy } from 'react';
import commonRoutes from '../commonRoutes';

const AppShowReport = Loadable(lazy(() => import('./showZohoReport')));

const reportZohoRoute = [
  {
    path: commonRoutes.Zohoreports.reportsZohoGet, // This will now include the :id parameter
    element: <AppShowReport />,
  },
];

export default reportZohoRoute;
