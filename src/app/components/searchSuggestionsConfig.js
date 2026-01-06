import commonRoutes from './commonRoutes';

export const quickActionSets = {
  default: [
    { label: 'My Tasks', route: commonRoutes.tasks },
    { label: 'Profile', route: commonRoutes.userProfile.viewProfile },
    { label: 'Payslips', route: commonRoutes.salarySlip.payslips },
    { label: 'Attendance', route: commonRoutes.attendance.attendancelist },
    { label: 'Leaves', route: commonRoutes.leaves.leaveHistory },
    { label: 'FAQ', route: '/faq' },
    { label: 'Cultural Initiatives', route: '/culture/initiatives' },
    { label: 'Support', route: '/support' },
  ],

  admin: [
    { label: 'User List', route: commonRoutes.users.userlist },
    { label: 'Report Builder', route: commonRoutes.reports.reportsList },
    { label: 'Salary Admin', route: commonRoutes.salarySlip.salarySlipList },
    { label: 'Profile', route: commonRoutes.userProfile.viewProfile },
    { label: 'Attendance', route: commonRoutes.attendance.attendancelist },
    { label: 'Holiday', route: commonRoutes.holiday.holidaylist },
    { label: 'Leaves', route: commonRoutes.leaves.leaveHistory },

    // Newly Added
    { label: 'FAQ', route: '/faq' },
    { label: 'Cultural Initiatives', route: '/culture/initiatives' },
    { label: 'Support', route: '/support' },
  ],

  hr: [
    { label: 'Attendance', route: commonRoutes.attendance.attendancelist },
    { label: 'Holiday', route: commonRoutes.holiday.holidaylist },
    { label: 'Leaves', route: commonRoutes.leaves.leaveHistory },
    { label: 'Apply Leave', route: commonRoutes.leaves.applyLeave },
    { label: 'Profile', route: commonRoutes.userProfile.viewProfile },
    { label: 'Payslips', route: commonRoutes.salarySlip.payslips },

    // Newly Added
    { label: 'FAQ', route: '/faq' },
    { label: 'Cultural Initiatives', route: '/culture/initiatives' },
    { label: 'Support', route: '/support' },
  ],
};

export const getQuickActions = (roleId) => {
  if (['1', '2', '3', '4'].includes(roleId)) {
    return quickActionSets.admin;
  }
  if (['5', '6', '7', '8'].includes(roleId)) {
    return quickActionSets.hr;
  }
  return quickActionSets.default;
};

export const QUICK_ACCESS_STORAGE_KEY = 'quickAccessUsage';

export const getStoredUsage = () => {
  try {
    const stored = localStorage.getItem(QUICK_ACCESS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (err) {
    console.error('Failed to read quick access usage', err);
    return {};
  }
};

export const saveUsage = (map) => {
  try {
    localStorage.setItem(QUICK_ACCESS_STORAGE_KEY, JSON.stringify(map));
  } catch (err) {
    console.error('Failed to persist quick access usage', err);
  }
};

export const sortWithUsage = (actions, usageMap) => {
  if (!usageMap) return actions;
  return [...actions].sort((a, b) => {
    const aScore = usageMap[a.label] || 0;
    const bScore = usageMap[b.label] || 0;
    if (aScore === bScore) return 0;
    return bScore - aScore;
  });
};
