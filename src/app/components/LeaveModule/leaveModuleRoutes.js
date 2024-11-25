import Loadable from '../Loadable';
import { lazy } from 'react';
import commonRoutes from '../commonRoutes';

const AppLeaveHostory = Loadable(lazy(() => import('./LeaveHistory/LeaveHistory')));
const AppApplyLeave = Loadable(lazy(() => import('./ApplyLeave/ApplyLeave')));

const leaveModuleRoutes = [
  {
    path: commonRoutes.leaves.leaveHistory,
    element: <AppLeaveHostory />,
  },
  {
    path: commonRoutes.leaves.applyLeave,
    element: <AppApplyLeave />,
  },
];

export default leaveModuleRoutes;
