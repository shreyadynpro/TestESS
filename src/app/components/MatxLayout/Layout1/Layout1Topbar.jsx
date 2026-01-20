import {
  Avatar,
  Divider,
  Icon,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  alpha,
  Autocomplete,
  Paper,
  InputAdornment,
} from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import { MatxMenu } from 'app/components';
import AppCurrentClient from 'app/components/AppCurrentClient';
import AppTogglePermission from 'app/components/AppTogglePermission';
import { themeShadows } from 'app/components/MatxTheme/themeColors';
import useAuth from 'app/hooks/useAuth';
import useRefreshData from 'app/hooks/useRefreshData';
import commonRoutes from 'app/components/commonRoutes';
import useSettings from 'app/hooks/useSettings';
import { topBarHeight } from 'app/utils/constant';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Span } from '../../../components/Typography';
import AppFullscreen from './AppFullscreen';
import AppThemeModeSwitch from './AppThemeModeSwitch';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  borderRadius: 999,
  padding: 6,
  transition: 'background 0.2s ease, transform 0.2s ease',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.15),
    transform: 'translateY(-1px)',
  },
  '&:active': {
    transform: 'scale(0.97) translateY(0px)',
  },
  '&:focus-visible': {
    outline: `2px solid ${alpha(theme.palette.primary.main, 0.8)}`,
    outlineOffset: 2,
  },
}));

// FIX: Always use theme.palette.text.primary for search text color
const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 999,
    height: 30,
    paddingRight: 0,
    backgroundColor: theme.palette.mode === 'dark' ? '#1f2430' : '#fff',
    transition: 'width 0.3s ease, box-shadow 0.2s ease',
    '&:hover': {
      boxShadow: `0 0 0 1px ${alpha(theme.palette.primary.main, 0.3)}`,
    },
    '&.Mui-focused': {
      boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.25)}`,
    },
  },
  '& .MuiOutlinedInput-input': {
    padding: '4px 12px',
    height: '100%',
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    '&::placeholder': {
      color: theme.palette.mode === 'dark' ? '#f88f05' : '#333',
      opacity: 1,
    },
  },
}));

const TopbarRoot = styled('div')(() => ({
  top: 0,
  zIndex: 96,
  transition: 'all 0.3s ease',
  boxShadow: themeShadows[8],
  height: topBarHeight,
}));

const TopbarContainer = styled(Box)(({ theme }) => ({
  color: theme.palette.text.secondary,
  padding: '8px',
  paddingLeft: 18,
  paddingRight: 20,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: theme.palette.primary.main,
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  [theme.breakpoints.down('xs')]: {
    paddingLeft: 14,
    paddingRight: 16,
  },
}));

const UserMenu = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  borderRadius: 24,
  padding: 4,
  '& span': { margin: '0 8px' },
}));

const UserInfo = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: 24,
  padding: 4,
  '& span': { margin: '0 8px' },
}));

const Layout1Topbar = () => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const { logout } = useAuth();
  const user = useSelector((state) => state.userDetails?.user);
  const permission_btn = useSelector(
    (state) => state.userAccessPermissions?.userPermissions?.permission_btn
  );
  const activeTheme = useSelector((state) => state.currentTheme?.theme?.activeTheme);

  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));
  const activeThemeConfig = settings?.themes?.[activeTheme];
  const isLightMode = (activeThemeConfig?.palette?.type || 'light') !== 'dark';

  // FIX: Compute suggestion backgrounds and text color
  const suggestionBg = isLightMode ? '#f7f9fb' : theme.palette.background.paper;
  const suggestionText = isLightMode ? '#0d162c' : theme.palette.text.primary;
  const suggestionCaption = isLightMode ? 'rgba(29,38,44,.7)' : theme.palette.text.secondary;

  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState({ docs: [], actions: [] });
  const searchRef = useRef(null);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({
      layout1Settings: { leftSidebar: { ...sidebarSettings } },
    });
  };

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === 'close' ? 'mobile' : 'close';
    } else {
      mode = layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full';
    }
    updateSidebarMode({ mode });
  };

  const dispatch = useDispatch();

  const handleSearchChange = (event, value) => {
    setSearchValue(value || '');
    window.dispatchEvent(new CustomEvent('globalSearch', { detail: value?.trim() || '' }));
  };

  const handleSearchSubmit = (event, value) => {
    if (value) {
      window.dispatchEvent(new CustomEvent('globalSearch', { detail: value.trim() }));
      setSearchValue('');
    }
  };

  const toggleSearch = (event) => {
    event.stopPropagation();
    if (searchOpen) {
      setSearchValue('');
      window.dispatchEvent(new CustomEvent('globalSearch', { detail: '' }));
    } else {
      // Focus the input when opening
      setTimeout(() => {
        if (searchRef.current) {
          searchRef.current.focus();
        }
      }, 0);
    }
    setSearchOpen(!searchOpen);
  };

  useEffect(() => {
    const handleSuggestions = (event) => {
      setSuggestions(event?.detail || { docs: [], actions: [] });
    };

    const handleClickOutside = (event) => {
      if (
        searchOpen &&
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target) &&
        !(event.target.closest && event.target.closest('.MuiAutocomplete-popper'))
      ) {
        setSearchOpen(false);
        setSearchValue('');
        window.dispatchEvent(new CustomEvent('globalSearch', { detail: '' }));
      }
    };

    // Add when component mounts
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('searchSuggestionsReady', handleSuggestions);

    // Clean up
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('searchSuggestionsReady', handleSuggestions);
    };
  }, [searchOpen]);

  const { handleRefreshData } = useRefreshData();

  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          <Tooltip title="Toggle Sidebar">
            <StyledIconButton onClick={handleSidebarToggle}>
              <Icon>menu</Icon>
            </StyledIconButton>
          </Tooltip>
          <Tooltip title="Home">
            <Link to="/home">
              <StyledIconButton
                onClick={() => {
                  handleRefreshData();
                  dispatch({
                    type: 'SET_CLIENT',
                    client: {
                      subCategory_name: '',
                      client_name: '',
                      folder_name: '',
                      dashboard_name: '',
                      client_id: '',
                    },
                  });
                }}
              >
                <Icon>home</Icon>
              </StyledIconButton>
            </Link>
          </Tooltip>
        </Box>
        <Box display="flex" alignItems="center">
          <AppCurrentClient />
        </Box>
        <Box display="flex" alignItems="center">
          <Box
            ref={searchContainerRef}
            sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}
          >
            <Box
              sx={{
                width: searchOpen ? 350 : 0,
                opacity: searchOpen ? 1 : 0,
                transition: 'all 0.3s ease',
                overflow: searchOpen ? 'visible' : 'hidden',
              }}
            >
              <Autocomplete
                freeSolo
                disableClearable
                options={[]}
                value={searchValue}
                onChange={handleSearchSubmit}
                onInputChange={handleSearchChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputRef={searchRef}
                    placeholder="Search for Documents, PaySlips, Attendance..."
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        height: 40,
                        pr: 1.5,
                        borderRadius: 999,
                        backgroundColor: isLightMode ? '#ffffff' : '#0f172a',
                        transition: 'box-shadow 0.25s ease, transform 0.2s ease',
                        '& fieldset': {
                          borderRadius: 999,
                          borderColor: isLightMode ? alpha('#0f172a', 0.15) : alpha('#94a3b8', 0.35),
                        },
                        
                        '&:hover': {
                          boxShadow: isLightMode
                            ? '0 6px 18px rgba(15, 23, 42, 0.08)'
                            : '0 8px 18px rgba(15, 23, 42, 0.45)',
                          transform: 'translateY(-1px)',
                        },
                        '&.Mui-focused': {
                          boxShadow: isLightMode
                            ? '0 0 0 3px rgba(25, 118, 210, 0.22)'
                            : '0 0 0 3px rgba(96, 165, 250, 0.35)',
                          transform: 'translateY(-1px)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1976d2',
                          borderWidth: 2,
                        },
                      },
                      '& .MuiInputBase-input': {
                        py: '10px',
                        px: 1.5,
                        color: isLightMode ? 'text.primary' : '#f8fafc',
                        '&::placeholder': {
                          color: isLightMode ? 'text.secondary' : alpha('#e2e8f0', 0.8),
                          opacity: 1,
                        },
                      },
                    }}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon sx={{ color: 'text.secondary', mr: 1 }}>search</Icon>
                        </InputAdornment>
                      ),
                      endAdornment: searchValue && (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            onClick={() => {
                              setSearchValue('');
                              window.dispatchEvent(new CustomEvent('globalSearch', { detail: '' }));
                            }}
                          >
                            <Icon fontSize="small">close</Icon>
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
                PaperComponent={(props) => (
                  <Paper
                    {...props}
                    sx={{
                      mt: 0.5,
                      boxShadow: 3,
                      '& .MuiAutocomplete-listbox': {
                        p: 0,
                        '& li': {
                          px: 2,
                          py: 1,
                        },
                      },
                    }}
                  />
                )}
              />
            </Box>
            <StyledIconButton
              onClick={toggleSearch}
              sx={{
                ml: 1,
                transform: searchOpen ? 'scale(1.1)' : 'scale(1)',
                transition: 'transform 0.2s ease',
              }}
            >
              <Icon>{searchOpen ? 'close' : 'search'}</Icon>
            </StyledIconButton>
            {searchOpen &&
              searchValue &&
              (suggestions.docs.length > 0 || suggestions.actions.length > 0) && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: 310,
                    bgcolor: suggestionBg,
                    borderRadius: 2,
                    boxShadow: 4,
                    zIndex: 1400,
                    maxHeight: 280,
                    overflowY: 'auto',
                  }}
                >
                  {suggestions.docs.length > 0 && (
                    <Box sx={{ px: 2, py: 1 }}>
                      <Typography variant="caption" color={suggestionCaption}>
                        Documents
                      </Typography>
                      <List disablePadding>
                        {suggestions.docs.map((doc) => (
                          <ListItemButton
                            key={doc.id}
                            onClick={() => {
                              window.dispatchEvent(
                                new CustomEvent('openDocumentRequest', { detail: { doc } })
                              );
                              setSearchValue('');
                              setSearchOpen(false);
                            }}
                            sx={{
                              borderRadius: 1,
                              color: suggestionText,
                            }}
                          >
                            <ListItemText
                              primary={doc.doc_name}
                              secondary={doc.section_title}
                              primaryTypographyProps={{
                                variant: 'body2',
                                sx: { color: suggestionText },
                              }}
                              secondaryTypographyProps={{
                                variant: 'caption',
                                sx: { color: suggestionCaption },
                              }}
                            />
                          </ListItemButton>
                        ))}
                      </List>
                    </Box>
                  )}
                  {suggestions.docs.length > 0 && suggestions.actions.length > 0 && <Divider />}
                  {suggestions.actions.length > 0 && (
                    <Box sx={{ px: 2, py: 1 }}>
                      <Typography variant="caption" color={suggestionCaption}>
                        Actions
                      </Typography>
                      <List disablePadding>
                        {suggestions.actions.map((action) => (
                          <ListItemButton
                            key={action.label}
                            onClick={() => {
                              navigate(action.route);
                              setSearchValue('');
                              setSearchOpen(false);
                            }}
                            sx={{
                              borderRadius: 1,
                              color: suggestionText,
                            }}
                          >
                            <ListItemText
                              primary={action.label}
                              primaryTypographyProps={{
                                variant: 'body2',
                                sx: { color: suggestionText },
                              }}
                            />
                          </ListItemButton>
                        ))}
                      </List>
                    </Box>
                  )}
                </Box>
              )}
          </Box>
          <AppThemeModeSwitch
            Icon={Icon}
            StyledIconButton={StyledIconButton}
            TooltipName="Change Theme"
          />
          <AppFullscreen
            Icon={Icon}
            StyledIconButton={StyledIconButton}
            TooltipName="Toggle Fullscreen"
          />
          {/* <MatxMenu ... /> */}
          <Tooltip title="Logout">
            <StyledIconButton onClick={logout}>
              <Icon>power_settings_new</Icon>
            </StyledIconButton>
          </Tooltip>
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default React.memo(Layout1Topbar);