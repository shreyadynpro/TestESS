import Loadable from '../Loadable';
import { lazy } from 'react';
import commonRoutes from '../commonRoutes';

const AppReferralList = Loadable(lazy(() => import('./ReferralList/ReferralList')));

const referralModuleRoutes = [
  {
    path: commonRoutes.referral.referrallist,
    element: <AppReferralList />,
  },
];

export default referralModuleRoutes;
