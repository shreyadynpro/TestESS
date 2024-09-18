import { styled } from '@mui/system';
import { Fragment, memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Scrollbar from 'react-perfect-scrollbar';
import { Box, Typography, Collapse } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import SecurityIcon from '@mui/icons-material/Security';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import BadgeIcon from '@mui/icons-material/Badge';
import SummarizeIcon from '@mui/icons-material/Summarize';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import EventNoteIcon from '@mui/icons-material/EventNote';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CampaignIcon from '@mui/icons-material/Campaign';
import InfoIcon from '@mui/icons-material/Info';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useSelector } from 'react-redux';
import commonRoutes from './commonRoutes';

const SidenavContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.default, // Apply background color to the entire sidenav
  height: '100vh', // Ensure it covers the entire viewport height
}));

const StyledScrollBar = styled(Scrollbar)({
  paddingLeft: '0.1rem',
  paddingRight: '0.1rem',
  position: 'relative',
});

const SideNavMobile = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: '100vw',
  background: 'rgba(0, 0, 0, 0.54)',
  zIndex: -1,
  [theme.breakpoints.up('lg')]: { display: 'none' },
}));

const MenuItem = styled(({ isProfile, ...rest }) => <Box {...rest} />)(({ theme, isProfile }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 20px',
  cursor: 'pointer',
  fontWeight: isProfile ? 'bold' : 'normal',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const MenuLabel = styled(({ isProfile, active, ...rest }) => <Typography {...rest} />)(
  ({ theme, isProfile, active, fontSize, fontWeight, color }) => ({
    fontWeight: isProfile ? 'bold' : fontWeight || 'medium',
    fontStyle: isProfile ? 'italic' : 'normal',
    fontSize: fontSize || '16px',
    color:
      isProfile && active
        ? theme.palette.mode === 'light'
          ? '#00246b' // Light mode color
          : '#22cfe2' // Dark mode color
        : color || theme.palette.text.primary,
  })
);

const MenuIcon = styled(Box)(({ theme }) => ({
  fontSize: '24px',
  marginRight: '16px',
}));

const MenuArrow = styled(Box)(({ theme }) => ({
  marginLeft: 'auto',
  transition: 'transform 0.3s ease',
}));

const SubMenuItem = styled(MenuItem)(({ theme }) => ({
  paddingLeft: '40px',
  backgroundColor: theme.palette.action.hover,
}));

const Sidenav = () => {
  const [openMenu, setOpenMenu] = useState({});
  const navigate = useNavigate();
  const user = useSelector((state) => state.userDetails?.user);

  const { uaPermissions } = useSelector((state) => ({
    uaPermissions: state.userAccessPermissions.userPermissions,
  }));

  const allMenuItems = [
    {
      title: `${user?.first_name || ''} ${user?.last_name || ''},`,
      path: '/Profile',
      fontSize: '20px',
      fontWeight: 'bold',
      isProfile: true,
      permissionKey: 'roles',
    },
    {
      title: 'Group Master',
      path: '/group-master',
      icon: <GroupIcon />,
      permissionKey: 'groups',
    },
    { title: 'Roles', path: '/role', icon: <SecurityIcon />, permissionKey: 'roles' },
    {
      title: 'User Access Control',
      path: '/groups',
      icon: <LockIcon />,
      permissionKey: 'users',
    },
    { title: 'Users', path: '/splitUsers', icon: <PersonIcon />, permissionKey: 'users' },
    {
      title: 'Employees',
      path: '/employee-master',
      icon: <GroupsIcon />,
      permissionKey: 'employees',
    },
    {
      title: 'Power BI',
      path: '/reports',
      icon: <SummarizeIcon />,
      permissionKey: 'reports',
      subMenu: [
        {
          title: 'Demo',
          path: commonRoutes.reports.reportsGet.replace(
            ':id',
            '0d6cf1ab-d1c5-4f14-af60-16a1c83d67b0'
          ),
          permissionKey: 'reports',
        },
        {
          title: 'Employee Report',
          path: commonRoutes.reports.reportsGet.replace(
            ':id',
            '879238e6-8b3b-485f-9c16-001f204fd47c'
          ),
          permissionKey: 'reports',
        },
      ],
    },
    {
      title: 'Zoho',
      path: '/zohoreports',
      icon: <SummarizeIcon />,
      permissionKey: 'reports',
      subMenu: [
        {
          title: 'Demo',
          path: commonRoutes.Zohoreports.reportsZohoGet.replace(':id', '377745000000002340'),
          permissionKey: 'reports',
        },
      ],
    },
    {
      title: 'Leave',
      path: '/leave',
      icon: <EventNoteIcon />,
      permissionKey: 'leaves',
      subMenu: [
        { title: 'Leave Type Master', path: '/leave/sick', permissionKey: 'leaves' },
        { title: 'Leave Apply', path: '/leave/casual', permissionKey: 'leaves' },
        { title: 'Grant Leave', path: '/leave/grant', permissionKey: 'leaves' },
        { title: 'Leave Balance', path: '/leave/balance', permissionKey: 'leaves' },
        {
          title: 'Leave Approval Tracking',
          path: '/leave/approval-tracking',
          permissionKey: 'leaves',
        },
        { title: 'Leave Calendar', path: '/leave/calendar', permissionKey: 'leaves' },
        {
          title: 'Manage Holiday Calendar',
          path: '/leave/manage-calendar',
          permissionKey: 'leaves',
        },
        {
          title: 'Holiday Calendar',
          path: '/leave/holiday-calendar',
          permissionKey: 'leaves',
        },
      ],
    },
    {
      title: 'Salary',
      path: '/salary',
      icon: <MonetizationOnIcon />,
      permissionKey: 'salary',
      subMenu: [
        { title: 'Payslips', path: '/salary/payslip/payslips', permissionKey: 'salary' },
        // {
        //   title: 'IT Statements',
        //   path: '/salary/it-statements',
        //   permissionKey: 'salary',
        // },
        // {
        //   title: 'IT Declaration',
        //   path: '/salary/it-declaration',
        //   permissionKey: 'salary',
        // },
        // {
        //   title: 'Loans & Advances',
        //   path: '/salary/loans-advances',
        //   permissionKey: 'salary',
        // },
        // {
        //   title: 'Reimbursement',
        //   path: '/salary/reimbursement',
        //   permissionKey: 'salary',
        // },
        // { title: 'Salary Revision', path: '/salary/revision', permissionKey: 'salary' },
      ],
    },
    {
      title: 'Documents',
      path: '/documents',
      icon: <DescriptionIcon />,
      permissionKey: 'documents',
    },
    {
      title: 'Attendance',
      path: '/attendance',
      icon: <CalendarMonthIcon />,
      permissionKey: 'attendance',
      subMenu: [
        { title: 'Daily', path: '/attendance/daily', permissionKey: 'attendanceDaily' },
        { title: 'Monthly', path: '/attendance/monthly', permissionKey: 'attendanceMonthly' },
      ],
    },
    {
      title: 'Activities',
      path: '/activities',
      icon: <CampaignIcon />,
      permissionKey: 'activities',
    },
    { title: 'Help', path: '/help', icon: <InfoIcon />, permissionKey: 'help' },
  ];

  const filterMenuItems = (items) => {
    return items
      .filter((item) => {
        // Always include the profile item
        if (item.isProfile) return true;
        // Filter other items based on permissions
        return uaPermissions[item.permissionKey] === 1;
      })
      .map((item) => ({
        ...item,
        subMenu: item.subMenu ? filterMenuItems(item.subMenu) : null,
      }))
      .filter((item) => !item.subMenu || item.subMenu.length > 0);
  };

  const menuItems = filterMenuItems(allMenuItems);

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const handleSubMenuClick = (index) => {
    setOpenMenu((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <SidenavContainer>
      <StyledScrollBar>
        {menuItems.map((item, index) => (
          <Fragment key={index}>
            <MenuItem
              onClick={
                item.subMenu ? () => handleSubMenuClick(index) : () => handleMenuClick(item.path)
              }
              isProfile={item.isProfile}
            >
              {item.icon && <MenuIcon>{item.icon}</MenuIcon>}
              <MenuLabel
                isProfile={item.isProfile}
                fontSize={item.fontSize}
                fontWeight={item.fontWeight}
                color={item.color}
              >
                {item.title}
              </MenuLabel>
              {item.subMenu && (
                <MenuArrow
                  sx={{
                    transform: openMenu[index] ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  {openMenu[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </MenuArrow>
              )}
            </MenuItem>
            {item.subMenu && (
              <Collapse in={openMenu[index]} timeout="auto" unmountOnExit>
                {item.subMenu.map((subItem, subIndex) => (
                  <SubMenuItem
                    key={`${index}-${subIndex}`}
                    onClick={() => handleMenuClick(subItem.path)}
                  >
                    <MenuLabel>{subItem.title}</MenuLabel>
                  </SubMenuItem>
                ))}
              </Collapse>
            )}
          </Fragment>
        ))}
      </StyledScrollBar>
      <SideNavMobile />
    </SidenavContainer>
  );
};

export default memo(Sidenav);
