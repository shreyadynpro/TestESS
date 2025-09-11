// import React from 'react';
// import { Box, Button, CircularProgress, Typography, styled } from '@mui/material';
// import { Breadcrumb } from 'app/components';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// const Container = styled('div')(({ theme }) => ({
//   margin: '30px',
//   [theme.breakpoints.down('sm')]: { margin: '16px' },
//   height: 'calc(100vh - 180px)',
// }));

// const StyledIframe = styled('iframe')({
//   width: '100%',
//   height: '100%',
//   border: 'none',
//   borderRadius: '4px',
// });

// const ErrorBox = styled(Box)({
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   justifyContent: 'center',
//   height: '100%',
//   textAlign: 'center',
//   padding: '16px',
// });

// const SubmittedTimesheet = ({ timesheetData, onBackClick }) => {
//   if (!timesheetData || timesheetData.error) {
//     return (
//       <>
//         <Box className="breadcrumb" sx={{ m: 1 }}>
//           <Breadcrumb routeSegments={[{ name: 'Timesheet', path: '/timesheet' }, { name: 'View Submitted Timesheet' }]} />
//         </Box>
//         <Container>
//           <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
//             <Button startIcon={<ArrowBackIcon />} onClick={onBackClick}>
//               Back
//             </Button>
//           </Box>
//           <ErrorBox>
//             <Typography color="error" variant="h6" gutterBottom>
//               {timesheetData?.error || 'Error loading submitted timesheet'}
//             </Typography>
//             <Button variant="outlined" color="primary" onClick={onBackClick}>
//               Try again
//             </Button>
//           </ErrorBox>
//         </Container>
//       </>
//     );
//   }

//   return (
//     <>
//       <Box className="breadcrumb" sx={{ m: 1 }}>
//         <Breadcrumb routeSegments={[{ name: 'Timesheet', path: '/timesheet' }, { name: 'View Submitted Timesheet' }]} />
//       </Box>
//       <Container>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//           <Button startIcon={<ArrowBackIcon />} onClick={onBackClick}>
//             Back
//           </Button>
//           <Typography variant="subtitle1">
//             {timesheetData.file_name?.replace(/_/g, ' ').replace('.html', '') || 'Timesheet Document'}
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => window.open(timesheetData.file_url, '_blank', 'noopener,noreferrer')}
//           >
//             Open in New Tab
//           </Button>
//         </Box>
//         <Box sx={{ borderRadius: 1, overflow: 'hidden', height: 'calc(100% - 56px)', boxShadow: 1 }}>
//           <StyledIframe src={timesheetData.file_url} title="Submitted Timesheet" />
//         </Box>
//       </Container>
//     </>
//   );
// };

// export default SubmittedTimesheet;



// modified by arman khan



import React from 'react';
import { Box, Button, CircularProgress, Typography, styled, Chip } from '@mui/material';
import { Breadcrumb } from 'app/components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  height: 'calc(100vh - 180px)',
  position: 'relative',
}));

const StyledIframe = styled('iframe')({
  width: '100%',
  height: '100%',
  border: 'none',
  borderRadius: '4px',
});

const ErrorBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  textAlign: 'center',
  padding: '16px',
});

const StatusChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: '20px',
  right: '20px',
  zIndex: 1000,
  fontSize: '0.75rem',
  fontWeight: 'bold',
}));

const SubmittedTimesheet = ({ timesheetData, onBackClick, statusInfo }) => {
  if (!timesheetData || timesheetData.error) {
    return (
      <>
        <Box className="breadcrumb" sx={{ m: 1 }}>
          <Breadcrumb routeSegments={[{ name: 'Timesheet', path: '/timesheet' }, { name: 'View Submitted Timesheet' }]} />
        </Box>
        <Container>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
            <Button startIcon={<ArrowBackIcon />} onClick={onBackClick}>
              Back
            </Button>
          </Box>
          <ErrorBox>
            <Typography color="error" variant="h6" gutterBottom>
              {timesheetData?.error || 'Error loading submitted timesheet'}
            </Typography>
            <Button variant="outlined" color="primary" onClick={onBackClick}>
              Try again
            </Button>
          </ErrorBox>
        </Container>
      </>
    );
  }

  return (
    <>
      <Box className="breadcrumb" sx={{ m: 1 }}>
        <Breadcrumb routeSegments={[{ name: 'Timesheet', path: '/timesheet' }, { name: 'View Submitted Timesheet' }]} />
      </Box>
      <Container>
        {/* Show status chip in top right corner */}
        {statusInfo && (
          <StatusChip
            label={statusInfo.text}
            color={statusInfo.color}
            variant="filled"
          />
        )}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Button startIcon={<ArrowBackIcon />} onClick={onBackClick}>
            Back
          </Button>
          <Typography variant="subtitle1" sx={{ flexGrow: 1, textAlign: 'center', mr: 2 }}>
            {timesheetData.file_name?.replace(/_/g, ' ').replace('.html', '') || 'Timesheet Document'}
          </Typography>
        </Box>
        <Box sx={{ borderRadius: 1, overflow: 'hidden', height: 'calc(100% - 56px)', boxShadow: 1 }}>
          <StyledIframe src={timesheetData.file_url} title="Submitted Timesheet" />
        </Box>
      </Container>
    </>
  );
};

export default SubmittedTimesheet;