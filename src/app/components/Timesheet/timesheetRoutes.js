import Loadable from '../Loadable';
import { lazy } from 'react';
import commonRoutes from '../commonRoutes';

// Use Loadable + lazy pattern for all components
const AppTimesheet = Loadable(lazy(() => import('./Timesheet')));

const timesheetRoutes = [
  {
    path: commonRoutes.timesheet.timesheet,
    element: <AppTimesheet />,
  },
];

export default timesheetRoutes;
