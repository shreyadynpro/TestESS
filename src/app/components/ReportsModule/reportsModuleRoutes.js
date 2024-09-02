// reportroutemodule.js
import Loadable from '../Loadable';
import { lazy } from 'react';
import commonRoutes from '../commonRoutes';

const AppShowReport = Loadable(lazy(() => import('./showReport')));
const AppAllReportsCreate = Loadable(lazy(() => import('./CreateAllReports/CreateAllReports')));
const AppAllReportsEdit = Loadable(lazy(() => import('./EditAllReports/EditAllReports')));

const reportsModuleRoutes = [
  {
    path: commonRoutes.reports.reportsGet, // This will now include the :id parameter
    element: <AppShowReport />,
  },
  {
    path: commonRoutes.reports.reportsAdd,
    element: <AppAllReportsCreate />,
  },
  {
    path: commonRoutes.reports.reportsEdit,
    element: <AppAllReportsEdit />,
  },
];

export default reportsModuleRoutes;
