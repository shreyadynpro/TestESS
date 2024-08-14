import Loadable from '../Loadable';
import { lazy } from 'react';
import commonRoutes from '../commonRoutes';

const AppLandingPage = Loadable(lazy(() => import('./AppLandingPage')));

const landingPageRoute = [
  {
    // path: commonRoutes.landingPage.defaultLandingPage,
    path: commonRoutes.landingPage.signin,
    element: <AppLandingPage />,
  },
];

export default landingPageRoute;
