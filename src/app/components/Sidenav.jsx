import { styled } from '@mui/system';
import { Fragment, memo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Scrollbar from 'react-perfect-scrollbar';
import { Box, Typography, Collapse, Avatar } from '@mui/material';
import { useTranslation } from 'react-i18next';
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
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import EventIcon from '@mui/icons-material/Event';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useSelector } from 'react-redux';
import commonRoutes from './commonRoutes';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';


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

const getInitials = (firstName, lastName) => {
  const firstInitial = firstName?.charAt(0).toUpperCase() || '';
  const lastInitial = lastName?.charAt(0).toUpperCase() || '';
  return `${firstInitial}${lastInitial}`;
};

const InitialsIcon = styled(Avatar)(({ theme }) => ({
  width: 32,
  height: 32,
  backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#22cfe2', // Change color based on theme mode
  color: theme.palette.mode === 'dark' ? '#000' : '#fff', // Adjust text color accordingly
  fontSize: '14px',
  marginRight: '0px', // Add some space between icon and text
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
  const { t } = useTranslation();
  const [openMenu, setOpenMenu] = useState({});
  const navigate = useNavigate();
  const user = useSelector((state) => state.userDetails?.user);

  // Listen for language changes and force re-render
  useEffect(() => {
    const handleLanguageChange = () => {
      setOpenMenu({});
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);

  const { uaPermissions } = useSelector((state) => ({
    uaPermissions: state.userAccessPermissions.userPermissions,
  }));

  const allMenuItems = [
    {
      title: `${user?.first_name || ''} ${user?.last_name || ''}`,
      path: '/Profile?tab=personal',
      fontSize: '20px',
      fontWeight: 'bold',
      isProfile: true,
      permissionKey: 'roles',
      icon: <InitialsIcon>{getInitials(user?.first_name, user?.last_name)}</InitialsIcon>, // Add the initials icon
    },
    {
      title: t('navigation.groupMaster'),
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
      title: 'Documents Center',
      path: '/documentcenter',
      icon: <DescriptionIcon />,
      permissionKey: 'documents',
    },
    {
      title: 'Project Information',
      icon: <AssignmentIcon />,
      path: '/projectinfo',
      permissionKey: 'projectinfo',
    },
    {
      title: 'Timesheet',
      path: commonRoutes.timesheet?.timesheet || '/timesheet',
      icon: <AccessTimeIcon />,
      permissionKey: 'timesheet',
    },
    {
      title: 'Salary Slips',
      path: '/salary/payslip/payslips',
      permissionKey: 'salary',
      icon: <MonetizationOnIcon />,
    },
    {
      title: 'Holidays',
      path: '/holidays',
      icon: <BeachAccessIcon />,
      permissionKey: 'holiday',
    },
    {
      title: 'Attendance',
      path: '/attendance',
      icon: <EventIcon />,
      permissionKey: 'attendance',
    },
    {
      title: 'SalarySlips',
      path: '/salaryslips',
      icon: <EventIcon />,
      permissionKey: 'admin_salaryslips',
    },
    {
      title: 'Leave',
      path: '/leave/history',
      icon: <EventIcon />,
      permissionKey: 'leaves',
    },

    {
      title: 'Referral',
      path: '/referral',
      icon: <GroupAddIcon />,
      permissionKey: 'referral',
    },
     {
      title: 'Cultural Initiatives',
      path: '/culture/initiatives',
      icon: <Diversity3Icon />,
      allowAll: true,
    },
    {
      title: 'FAQ',
      path: '/faq',
      icon: <HelpOutlineIcon />,
      allowAll: true,
    },
    {
      title: 'Support',
      path: '/support',
      icon: <SupportAgentIcon />,
      allowAll: true,
    },
  ];

  const filterMenuItems = (items) => {
    return items
      .filter((item) => {
        // Always include the profile item
        if (item.isProfile) return true;
        // Always include items explicitly allowed for all
        if (item.allowAll) return true;
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
