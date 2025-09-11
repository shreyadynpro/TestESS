const commonRoutes = {
  dashboard: '/dashboard',
  home: '/home',
  // employees: '/EmployeeList',
  tasks: '/todo/tasks',
  payslips: '/salary/payslip/payslips',
  payslipPDF: '/salary/payslip/payslips/PDF',
  session: {
    signup: '/signup',
    signin: '/signin',
    forgot_password: '/forgot-password',
    validateotp: '/validateotp',
    change_password: '/change-password',
    notFound: '/404',
  },
  users: {
    usertablist: '/splitUsers',
    userlist: '/users',
    userAdd: '/users/add',
    userDelete: '/users/delete',
    userEdit: '/users/edit',
  },
  roles: {
    roleList: '/role',
    roleAdd: '/role/add',
    roleDelete: '/role/delete',
    roleEdit: '/role/edit',
  },

  groupMaster: {
    groupMasterlist: '/group-master',
    groupMasterAdd: '/group-master/add',
    groupMasterDelete: '/group-master/delete',
    groupMasterEdit: '/group-master/edit',
  },
  holiday: {
    holidaylist: '/holidays',
  },
  attendance: {
    attendancelist: '/attendance',
  },
  salarySlip: {
    salarySlipList: '/salaryslips',
  },

  employeeMaster: {
    employeeMasterlist: '/employee-master',
    employeeMasterAdd: '/employee-master/add',
    employeeMasterDelete: '/employee-master/delete',
    employeeMasterEdit: '/employee-master/edit',
  },
  groupUserMapping: {
    groupUserMappinglist: '/groups',
    groupUserMappingAdd: '/groups/add',
    groupUserMappingDelete: '/groups/delete',
    groupUserMappingEdit: '/groups/edit',
  },
  lookerDashboards: {},
  navigations: {},
  landingPage: {
    // defaultLandingPage: '/dyness_landing',
    defaultLandingPage: '/signin',
  },
  lookerPage: {
    defaultLookerList: '/lookerList',
    defaultLookerPage: '/lookerPage',
  },
  reports: {
    reportsList: '/reports',
    reportsAdd: '/reports/add',
    reportsDelete: '/reports/delete',
    reportsEdit: '/reports/edit',
    reportsGet: '/reports/get/:id', // Add :id as a parameter
  },
  Zohoreports: {
    reportsZohoGet: '/zohoreport/get/:id', // Add :id as a parameter
  },
  generate_reports: {
    generate_reportsTabList: '/splitGenerateReports',
    generate_reportsList: '/generate_reports',
    generate_reportsAdd: '/generate_reports/add',
    generate_reportsDelete: '/generate_reports/delete',
    generate_reportsEdit: '/generate_reports/edit',
    generate_sum_reportsAdd: '/generate_summary_reports/add',
  },
  clients: {
    clientList: '/client',
    clientAdd: '/client/add',
    clientDelete: '/client/delete',
    clientEdit: '/client/edit',
  },
  inviteUser: '/inviteUser',
  userProfile: {
    viewProfile: '/profile',
    editProfile: '/profile/edit',
  },
  localizaion: {
    localizationSplitList: '/localization',
  },
  referral: {
    referrallist: '/referral',
  },
  documentcenter: {
    documentcenter: '/documentcenter',
  },
  projectinfo: {
    projectinfo: '/projectinfo',
  },
  timesheet: {
    timesheet: '/timesheet',
  },
  leaves: {
    leaveHistory: '/leave/history',
    applyLeave: '/leaveapply',
  },
  // powerBIClient: '/powerBIClient',
};

export default commonRoutes;
