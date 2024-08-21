import Loadable from '../Loadable';
import { lazy } from 'react';
import commonRoutes from '../commonRoutes';

const AppEmployeeMasterList = Loadable(lazy(() => import('./EmployeeList/EmployeeList')));
const AppEmployeeMasterCreate = Loadable(lazy(() => import('./CreateEmployee/CreateEmployee')));
// const AppEmployeeMasterEdit = Loadable(
//   lazy(() => import('./EditEmployeeMaster/EditEmployeeMaster'))
// );

const EmployeeModuleRoutes = [
  {
    path: commonRoutes.employeeMaster.employeeMasterlist,
    element: <AppEmployeeMasterList />,
  },
  {
    path: commonRoutes.employeeMaster.employeeMasterAdd,
    element: <AppEmployeeMasterCreate />,
  },
  //   {
  //     path: commonRoutes.employeeMaster.employeeMasterEdit,
  //     element: <AppEmployeeMasterEdit />,
  //   },
];

export default EmployeeModuleRoutes;
