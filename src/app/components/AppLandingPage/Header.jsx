import {
  AppBar,
  Box,
  Container,
  Divider,
  Hidden,
  IconButton,
  List,
  ListItem,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { ChevronRight as ChevronRightIcon, Menu as MenuIcon } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

const navigationLinks = [
  { name: 'Login', href: '/signin' },
  { name: 'Register', href: '/signup' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const determineNavBarBgColor = (scrollCount) => (scrollPosition > 100 ? 'white' : 'transparent');

  return (
    <AppBar
      position="sticky"
      style={{
        color: 'black',
        boxShadow: 'none',
        backgroundColor: determineNavBarBgColor(scrollPosition),
        position: 'fixed',
        top: 0,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Hidden smDown>
              <div>
                {navigationLinks.map((item) => (
                  <NavLink key={item.name} variant="button" underline="none" to={item.href}>
                    <span
                      style={{
                        marginRight: 20,
                        color: '#fff', // Dusty mauve color
                        textDecoration: 'none',
                        '&:hover': {
                          color: '#fff', // Darker dusty mauve on hover
                          fontWeight: 'bold',
                          textDecoration: 'underline',
                        },
                        fontSize: '16px',
                        lineHeight: '24px',
                        fontWeight: 700,
                        padding: '26px 0',
                        textTransform: 'uppercase',
                        position: 'relative',
                        transition: 'all .3s ease-out 0s',
                      }}
                    >
                      {item.name}
                    </span>
                  </NavLink>
                ))}
              </div>
            </Hidden>
          </Box>
          <Hidden smUp>
            <IconButton onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </Container>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        <div
          onClick={() => setOpen(false)}
          onKeyPress={() => setOpen(false)}
          role="button"
          tabIndex={0}
        >
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {navigationLinks.map((item) => (
            <ListItem key={item.name}>
              <NavLink
                style={{
                  marginRight: 20,
                  color: '#fff', // Dusty mauve color
                  textDecoration: 'none',
                  '&:hover': { color: '#fff' }, // Darker dusty mauve on hover
                }}
                variant="button"
                underline="none"
                to={item.href}
              >
                {item.name}
              </NavLink>
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
    </AppBar>
  );
}
