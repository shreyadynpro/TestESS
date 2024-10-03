import Loadable from '../Loadable';
import { lazy } from 'react';
import commonRoutes from '../commonRoutes';

const AppDocCenter = Loadable(lazy(() => import('./DocumentCenter')));

const documentCenterRoutes = [
  {
    path: commonRoutes.documentcenter.documentcenter,
    element: <AppDocCenter />,
  },
];

export default documentCenterRoutes;
