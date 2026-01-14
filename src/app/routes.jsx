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
import reportZohoRoute from './components/ReportsModule/reportZohoRoute';
import roleModuleRoutes from './components/Role Module/roleModuleRoutes';
import userModuleRoutes from './components/UserModule/usermoduleRoutes';
import userProfileRoutes from './components/UserProfileModule/UserProfileRoutes';
import commonRoutes from './components/commonRoutes';
import BIDemo from './views/dashboard/BIDemo';
import EmployeeMasterModuleRoutes from './components/EmployeeModule/employeeModuleRoutes';
import HolidayModuleRoutes from './components/HolidayModule/holidayModuleRoutes';
import AttendanceModuleRoutes from './components/AttendanceModule/attendanceModuleRoutes';
import ReferralModuleRoutes from './components/ReferralModule/referralModuleRoutes';
import DocumentCenterRoutes from './components/DocumentCenter/documentCenterRoutes';
import ProjectInfoRoutes from './components/ProjectInfo/projectInfoRoutes';
import LeaveModuleRoutes from './components/LeaveModule/leaveModuleRoutes';
import SalarySlipsAdminRoutes from './components/SalarySlipsAdmin/salarySlipsAdminRoutes';
import TimesheetRoutes from './components/Timesheet/timesheetRoutes';
// import EmployeeList from './components/EmployeeList/EmployeeList';
import Tasks from './components/ToDo/Tasks';
import Payslips from './components/Salary/Payslip/Payslips';
import PayslipPDF from './components/Salary/Payslip/PayslipPDF';
import FAQ from './components/AppLandingPage/FAQ';
import CultureInitiativesPage from './components/pages/culture/initiatives/CultureInitiativesPage';
import SupportPage from './components/SupportPage/SupportPage';
import  OrgChart from './components/OrgChart/OrgChart'
import EventsPage from './components/EventsPage/EventsPage';
import AnnouncementsPage from './components/AnnouncementsPage/AnnouncementsPage';

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
      ...reportZohoRoute,
      ...generateReportsModuleRoutes,
      ...clientModuleRoutes,
      ...GroupMasterModuleRoutes,
      ...HolidayModuleRoutes,
      ...AttendanceModuleRoutes,
      ...ProjectInfoRoutes,
      ...ReferralModuleRoutes,
      ...DocumentCenterRoutes,
      ...TimesheetRoutes,
      ...roleModuleRoutes,
      ...localizationModuleRoutes,
      ...EmployeeMasterModuleRoutes,
      ...LeaveModuleRoutes,
      ...SalarySlipsAdminRoutes,
      { path: commonRoutes.powerBIClient, element: <BIDemo /> },
      { path: commonRoutes.home, element: <Home /> },
      { path: commonRoutes.tasks, element: <Tasks /> },
      { path: commonRoutes.payslips, element: <Payslips /> },
      { path: commonRoutes.payslipPDF, element: <PayslipPDF /> },
      { path: '/faq', element: <FAQ /> },
      { path: '/culture/initiatives', element: <CultureInitiativesPage /> },
      { path: '/support', element: <SupportPage /> },
      { path: '/orgchart', element: <OrgChart /> },
      { path: '/events', element: <EventsPage /> },
      { path: '/announcements', element: <AnnouncementsPage /> },
    ],
  },
  ...sessionRoutes,
  { path: '/', element: <Navigate to={commonRoutes.home} /> },
  { path: '*', element: <NotFound /> },
];

export default routes;
