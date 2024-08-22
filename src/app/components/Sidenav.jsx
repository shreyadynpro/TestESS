import { styled } from '@mui/system';
import { Fragment, memo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Scrollbar from 'react-perfect-scrollbar';
import { Box, Typography, Collapse } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import SecurityIcon from '@mui/icons-material/Security';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
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

const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: '0.1rem',
  paddingRight: '0.1rem',
  position: 'relative',
}));

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

const MenuItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 20px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const MenuIcon = styled(Box)(({ theme }) => ({
  fontSize: '24px',
  marginRight: '16px',
}));

const MenuLabel = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 'medium',
}));

const MenuArrow = styled(Box)(({ theme }) => ({
  marginLeft: 'auto',
  transition: 'transform 0.3s ease',
}));

const SubMenuItem = styled(MenuItem)(({ theme }) => ({
  paddingLeft: '40px',
  backgroundColor: theme.palette.action.hover,
}));

const allMenuItems = [
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
  { title: 'Reports', path: '/reports', icon: <SummarizeIcon />, permissionKey: 'reports' },
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
      { title: 'Payslips', path: '/salary/payslips', permissionKey: 'salary' },
      {
        title: 'IT Statements',
        path: '/salary/it-statements',
        permissionKey: 'salary',
      },
      {
        title: 'IT Declaration',
        path: '/salary/it-declaration',
        permissionKey: 'salary',
      },
      {
        title: 'Loans & Advances',
        path: '/salary/loans-advances',
        permissionKey: 'salary',
      },
      {
        title: 'Reimbursement',
        path: '/salary/reimbursement',
        permissionKey: 'salary',
      },
      { title: 'Salary Revision', path: '/salary/revision', permissionKey: 'salary' },
    ],
  },
  { title: 'Documents', path: '/documents', icon: <DescriptionIcon />, permissionKey: 'documents' },
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
  { title: 'Activities', path: '/activities', icon: <CampaignIcon />, permissionKey: 'activities' },
  { title: 'Help', path: '/help', icon: <InfoIcon />, permissionKey: 'help' },
];

const Sidenav = () => {
  const [openMenu, setOpenMenu] = useState({});
  const navigate = useNavigate();

  const { uaPermissions } = useSelector((state) => ({
    uaPermissions: state.userAccessPermissions.userPermissions,
  }));

  const filterMenuItems = (items) => {
    return items
      .filter((item) => uaPermissions[item.permissionKey] === 1)
      .map((item) => ({
        ...item,
        subMenu: item.subMenu ? filterMenuItems(item.subMenu) : null,
      }))
      .filter((item) => !item.subMenu || item.subMenu.length > 0);
  };

  const menuItems = filterMenuItems(allMenuItems);

  const handleMenuItemClick = (path, hasSubMenu) => {
    if (hasSubMenu) {
      setOpenMenu((prev) => ({
        ...prev,
        [path]: !prev[path],
      }));
    } else {
      navigate(path);
      setOpenMenu((prev) => ({
        ...prev,
        [path]: false,
      }));
    }
  };

  const renderMenuItems = (items, level = 0) => {
    return items.map((item) => (
      <Fragment key={item.title}>
        <MenuItem
          onClick={() => handleMenuItemClick(item.path, item.subMenu)}
          style={{ paddingLeft: `${20 + level * 20}px` }}
        >
          <MenuIcon>{item.icon}</MenuIcon>
          <MenuLabel>{item.title}</MenuLabel>
          {item.subMenu && (
            <MenuArrow>{openMenu[item.path] ? <ExpandLessIcon /> : <ExpandMoreIcon />}</MenuArrow>
          )}
        </MenuItem>
        {item.subMenu && (
          <Collapse in={openMenu[item.path]}>{renderMenuItems(item.subMenu, level + 1)}</Collapse>
        )}
      </Fragment>
    ));
  };

  return (
    <Fragment>
      <StyledScrollBar options={{ suppressScrollX: true }}>
        {renderMenuItems(menuItems)}
      </StyledScrollBar>

      <SideNavMobile onClick={() => setOpenMenu({})} />
    </Fragment>
  );
};

export default memo(Sidenav);
