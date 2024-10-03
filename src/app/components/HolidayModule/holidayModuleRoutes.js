import Loadable from '../Loadable';
import { lazy } from 'react';
import commonRoutes from '../commonRoutes';

const AppHolidayList = Loadable(lazy(() => import('./HolidayList/HolidayList')));

const holidayModuleRoutes = [
  {
    path: commonRoutes.holiday.holidaylist,
    element: <AppHolidayList />,
  },
];

export default holidayModuleRoutes;
