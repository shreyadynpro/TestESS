// src/components/Sidenav.jsx
import { styled } from '@mui/system';
import { Fragment, memo, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Scrollbar from 'react-perfect-scrollbar';
import { Box, Typography, Collapse } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import GroupsIcon from '@mui/icons-material/Groups';
import SummarizeIcon from '@mui/icons-material/Summarize';
import CampaignIcon from '@mui/icons-material/Campaign';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import LockIcon from '@mui/icons-material/Lock';
import SecurityIcon from '@mui/icons-material/Security';

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

const menuItems = [
  { title: 'Home', path: '/home', icon: <HomeIcon /> },
  {
    title: 'To Do',
    path: '/todo',
    icon: <FormatListBulletedIcon />,
    subMenu: [
      { title: 'Tasks', path: '/todo/tasks' },
      { title: 'Review', path: '/todo/reviews' },
    ],
  },
  {
    title: 'Leave',
    path: '/leave',
    icon: <EventNoteIcon />,
    subMenu: [
      { title: 'Leave Type Master', path: '/leave/sick' },
      { title: 'Leave Apply', path: '/leave/casual' },
      { title: 'Grant Leave', path: '/leave/grant' },
      { title: 'Leave Balance', path: '/leave/balance' },
      { title: 'Leave Approval Tracking', path: '/leave/approval-tracking' },
      { title: 'Leave Calendar', path: '/leave/calendar' },
      { title: 'Manage Holiday Calendar', path: '/leave/manage-calendar' },
      { title: 'Holiday Calendar', path: '/leave/holiday-calendar' },
    ],
  },
  {
    title: 'Attendance',
    path: '/attendance',
    icon: <CalendarMonthIcon />,
    subMenu: [
      { title: 'Daily', path: '/attendance/daily' },
      { title: 'Monthly', path: '/attendance/monthly' },
    ],
  },
  {
    title: 'Salary',
    path: '/salary',
    icon: <MonetizationOnIcon />,
    subMenu: [
      { title: 'Payslips', path: '/salary/payslips' },
      { title: 'IT Statements', path: '/salary/it-statements' },
      { title: 'IT Declaration', path: '/salary/it-declaration' },
      { title: 'Loans & Advances', path: '/salary/loans-advances' },
      { title: 'Reimbursement', path: '/salary/reimbursement' },
      { title: 'Salary Revision', path: '/salary/revision' },
    ],
  },
  { title: 'Documents', path: '/documents', icon: <DescriptionIcon /> },
  { title: 'Employees', path: '/EmployeeList', icon: <GroupsIcon /> },
  { title: 'Reports', path: '/reports', icon: <SummarizeIcon /> },
  { title: 'Activities', path: '/activities', icon: <CampaignIcon /> },
  { title: 'Help', path: '/help', icon: <InfoIcon /> },
  { title: 'User', path: '/splitUsers', icon: <PersonIcon /> },
  { title: 'Roles', path: '/role', icon: <SecurityIcon /> },
  { title: 'Group Master', path: '/group-master', icon: <GroupIcon /> },
  { title: 'User Access Control', path: '/groups', icon: <LockIcon /> },
];

const Sidenav = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const handleMenuItemClick = (path, hasSubMenu) => {
    if (hasSubMenu) {
      setOpenMenu((prev) => (prev === path ? null : path));
    } else {
      navigate(path); // Navigate to the selected path
      setOpenMenu(null); // Close the mobile nav if open
    }
  };

  return (
    <Fragment>
      <StyledScrollBar options={{ suppressScrollX: true }}>
        {menuItems.map((item) => (
          <div key={item.title}>
            <MenuItem onClick={() => handleMenuItemClick(item.path, item.subMenu)}>
              <MenuIcon>{item.icon}</MenuIcon>
              <MenuLabel>{item.title}</MenuLabel>
              {item.subMenu && (
                <MenuArrow>
                  {openMenu === item.path ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </MenuArrow>
              )}
            </MenuItem>
            {item.subMenu && (
              <Collapse in={openMenu === item.path}>
                {item.subMenu.map((subItem) => (
                  <SubMenuItem key={subItem.title} onClick={() => handleMenuItemClick(subItem.path, false)}>
                    <MenuLabel>{subItem.title}</MenuLabel>
                  </SubMenuItem>
                ))}
              </Collapse>
            )}
          </div>
        ))}
      </StyledScrollBar>
      <SideNavMobile onClick={() => setOpenMenu(null)} />
    </Fragment>
  );
};

export default memo(Sidenav);
