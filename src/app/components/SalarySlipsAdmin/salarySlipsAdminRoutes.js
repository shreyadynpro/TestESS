import Loadable from '../Loadable';
import { lazy } from 'react';
import commonRoutes from '../commonRoutes';

const AppSalarySlipList = Loadable(lazy(() => import('./SalarySlipList/SalarySlipList')));

const salarySlipsAdminRoutes = [
  {
    path: commonRoutes.salarySlip.salarySlipList,
    element: <AppSalarySlipList />,
  },
];

export default salarySlipsAdminRoutes;
