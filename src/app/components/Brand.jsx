import { Box, Typography, styled, useTheme } from '@mui/material';
import useRefreshData from 'app/hooks/useRefreshData';
import useSettings from 'app/hooks/useSettings';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import commonRoutes from './commonRoutes';

const BrandRoot = styled(Box)(({ theme }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '5px',
    paddingBottom: '8px',
  };
});

const AppHr = styled('hr')(({ theme }) => {
  return {
    width: '100%',
    padding: 0,
    margin: 0,
    backgroundColor: theme.palette.text.primary,
  };
});

const Brand = ({ children }) => {
  const theme = useTheme();
  const { settings } = useSettings();
  const leftSidebar = settings.layout1Settings.leftSidebar;
  const { mode } = leftSidebar;
  const currentTheme = useSelector((state) => state.currentTheme?.theme);
  const { handleRefreshData } = useRefreshData();
  const dispatch = useDispatch();

  return (
    <Link
      to={commonRoutes.home}
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
      <BrandRoot style={{ backgroundColor: currentTheme === 'Default Theme' ? '#fff' : 'inherit' }}>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: '#25326d',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: '3rem',
            }}
          >
            Dynalytix
          </Typography>
        </div>
        <Box className="sidenavHoverShow" sx={{ display: mode === 'compact' ? 'none' : 'block' }}>
          {children || null}
        </Box>
      </BrandRoot>
      {!(currentTheme === 'Default Theme') && <AppHr />}
    </Link>
  );
};

export default Brand;
