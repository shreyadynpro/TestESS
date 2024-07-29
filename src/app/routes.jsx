import AuthGuard from 'app/auth/AuthGuard';
import dashboardRoutes from 'app/views/dashboard/DashboardRoutes';
import NotFound from 'app/views/sessions/NotFound';
import sessionRoutes from 'app/views/sessions/SessionRoutes';
import { Navigate } from 'react-router-dom';
import Home from './components/Home';
import inviteUserRoute from './components/AppInviteUserModule/inviteUserRoute';
import lookerPageRoute from './components/AppLookerPage/lookerPageRoute';
import clientModuleRoutes from './components/ClientModule/clientModuleRoutes';
import generateReportsModuleRoutes from './components/GenereateReportsModule/generateReportsModuleRoutes';
import GroupMasterModuleRoutes from './components/GroupMasterModule/groupMasterModuleRoutes';
import groupUserMappingModuleRoutes from './components/GroupUserMappingModule/groupUserMappingRoutes';
import localizationModuleRoutes from './components/LocalizationModule/localizationModuleRoutes';
import MatxLayout from './components/MatxLayout/MatxLayout';
import reportsModuleRoutes from './components/ReportsModule/reportsModuleRoutes';
import roleModuleRoutes from './components/Role Module/roleModuleRoutes';
import userModuleRoutes from './components/UserModule/usermoduleRoutes';
import userProfileRoutes from './components/UserProfileModule/UserProfileRoutes';
import commonRoutes from './components/commonRoutes';
import BIDemo from './views/dashboard/BIDemo';
import EmployeeList from './components/EmployeeList/EmployeeList';
import Tasks from './components/ToDo/Tasks';

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...dashboardRoutes,
      ...userModuleRoutes,
      ...userProfileRoutes,
      ...groupUserMappingModuleRoutes,
      ...lookerPageRoute,
      ...inviteUserRoute,
      ...reportsModuleRoutes,
      ...generateReportsModuleRoutes,
      ...clientModuleRoutes,
      ...GroupMasterModuleRoutes,
      ...roleModuleRoutes,
      ...localizationModuleRoutes,
      { path: commonRoutes.powerBIClient, element: <BIDemo /> },
      { path: commonRoutes.home, element: <Home /> },
      { path: commonRoutes.employees, element: <EmployeeList /> },
      {path: commonRoutes.tasks, element: <Tasks />},
    ],
  },
  ...sessionRoutes,
  { path: '/', element: <Navigate to={commonRoutes.home} /> },
  { path: '*', element: <NotFound /> },
];

export default routes;
