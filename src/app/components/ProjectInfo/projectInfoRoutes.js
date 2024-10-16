import Loadable from '../Loadable';
import { lazy } from 'react';
import commonRoutes from '../commonRoutes';

const AppProjectInfo = Loadable(lazy(() => import('./ProjectInfo')));

const projectInfoRoutes = [
  {
    path: commonRoutes.projectinfo.projectinfo,
    element: <AppProjectInfo />,
  },
];

export default projectInfoRoutes;
