import Loadable from '../Loadable';
import { lazy } from 'react';
import commonRoutes from '../commonRoutes';

const AppAttendanceList = Loadable(lazy(() => import('./AttendanceList/AttendanceList')));

const attendanceModuleRoutes = [
  {
    path: commonRoutes.attendance.attendancelist,
    element: <AppAttendanceList />,
  },
];

export default attendanceModuleRoutes;
