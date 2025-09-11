// import React, { useState, useEffect, useRef } from 'react';
// import { Box, Button, CircularProgress, Typography, styled } from '@mui/material';
// import { Breadcrumb } from 'app/components';
// import { checkTimesheetStatus, getSubmittedTimesheetUrl } from '../../../../src/app/api/timesheet';
// import SubmittedTimesheet from './SubmittedTimesheet';
// import SnackbarUtils from 'SnackbarUtils';

// // Proxy URL for embedding external timesheet form
// const TIMESHEET_URL = '/timesheet-proxy/CLRA/loginTimesheet.php';

// const Container = styled('div')(({ theme }) => ({
//   margin: '30px',
//   [theme.breakpoints.down('sm')]: { margin: '16px' },
//   height: 'calc(100vh - 180px)',
// }));

// const LoadingContainer = styled(Box)({
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   justifyContent: 'center',
//   height: '100%',
// });

// const Timesheet = () => {
//   const [loading, setLoading] = useState(true);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [submittedTimesheet, setSubmittedTimesheet] = useState(null);
//   const [error, setError] = useState(null);
//   const [showNewForm, setShowNewForm] = useState(false);
//   const iframeRef = useRef(null);
//   const hasAttemptedLogin = useRef(false);
  
//   // Handler for iframe load event
//   const handleIframeLoad = () => {
//     try {
//       const iframe = iframeRef.current;
//       if (!iframe || hasAttemptedLogin.current) return;
      
//       // Give a little time for the iframe content to fully render
//       setTimeout(() => {
//         try {
//           // Access the iframe content
//           const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
          
//           // Check if we're on the login page by looking for PAN input field
//           const panInput = iframeDoc.querySelector('input[name="pan"]') || 
//                           iframeDoc.querySelector('input#pan') || 
//                           iframeDoc.querySelector('input[type="text"]');
          
//           // If there's no PAN input, we're probably not on the login page
//           if (!panInput) {
//             console.warn("PAN input field not found - not attempting login");
//             return;
//           }
          
//           // Get PAN number from localStorage
//           const panNumber = localStorage.getItem('identityNo');
          
//           if (!panNumber) {
//             console.warn("No PAN number found in localStorage");
//             return;
//           }
          
//           // Find the login button
//           const loginButton = iframeDoc.querySelector('input[type="submit"]') || 
//                              iframeDoc.querySelector('button[type="submit"]') ||
//                              iframeDoc.querySelector('button:contains("Login")') ||
//                              iframeDoc.querySelector('input[value="Login"]');
          
//           // Set the PAN number value
//           panInput.value = panNumber;
          
//           // Trigger input event to activate any potential listeners
//           const inputEvent = new Event('input', { bubbles: true });
//           panInput.dispatchEvent(inputEvent);
          
//           console.log("Autofilled PAN number");
          
//           // If login button found, click it after a short delay
//           if (loginButton) {
//             setTimeout(() => {
//               // Mark that we've attempted login to prevent multiple attempts
//               hasAttemptedLogin.current = true;
//               loginButton.click();
//               console.log("Auto-clicked login button");
//             }, 500);
//           } else {
//             console.warn("Login button not found in the iframe");
//           }
//         } catch (error) {
//           console.error("Error accessing iframe content:", error);
//         }
//       }, 1000); // Delay to ensure content is fully loaded
//     } catch (error) {
//       console.error("Error in iframe load handler:", error);
//     }
//   };

//   useEffect(() => {
//     const checkStatus = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         // Check if timesheet is submitted
//         const statusData = await checkTimesheetStatus();
        
//         if (statusData.error) {
//           setError(statusData.error);
//           setLoading(false);
//           return;
//         }

//         // If approvedFlag is 1, timesheet is submitted
//         if (statusData.approvedFlag != 1) {
//           setIsSubmitted(true);
          
//           // Get submitted timesheet URL
//           const timesheetData = await getSubmittedTimesheetUrl();
//           if (timesheetData.error) {
//             setError(timesheetData.error);
//           } else {
//             setSubmittedTimesheet(timesheetData);
//           }
//         } else {
//           setIsSubmitted(false);
//         }
        
//         setLoading(false);
//       } catch (err) {
//         console.error('Error in timesheet flow:', err);
//         setError('Failed to load timesheet data. Please try again later.');
//         setLoading(false);
//       }
//     };

//     checkStatus();
    
//     // Reset login attempt flag when component mounts
//     hasAttemptedLogin.current = false;
    
//     return () => {
//       // Reset login attempt flag when component unmounts
//       hasAttemptedLogin.current = false;
//     };
//   }, []);

//   const handleBackFromSubmitted = () => {
//     setShowNewForm(true);
//     // Reset login attempt flag when switching to new form
//     hasAttemptedLogin.current = false;
//   };

//   // Show loading state while checking timesheet status
//   if (loading) {
//     return (
//       <>
//         <Box className="breadcrumb" sx={{ m: 1 }}>
//           <Breadcrumb routeSegments={[{ name: 'Timesheet' }]} />
//         </Box>
//         <Container>
//           <LoadingContainer>
//             <CircularProgress />
//             <Typography sx={{ mt: 2 }}>Loading timesheet information...</Typography>
//           </LoadingContainer>
//         </Container>
//       </>
//     );
//   }

//   // Show error if any
//   if (error && !showNewForm) {
//     return (
//       <>
//         <Box className="breadcrumb" sx={{ m: 1 }}>
//           <Breadcrumb routeSegments={[{ name: 'Timesheet' }]} />
//         </Box>
//         <Container>
//           <LoadingContainer>
//             <Typography color="error" variant="h6" gutterBottom>
//               {error}
//             </Typography>
//             <Button 
//               variant="contained" 
//               color="primary" 
//               onClick={() => {
//                 setShowNewForm(true);
//                 // Reset login attempt flag when switching to new form
//                 hasAttemptedLogin.current = false;
//               }}
//               sx={{ mt: 2 }}
//             >
//               Fill New Timesheet
//             </Button>
//           </LoadingContainer>
//         </Container>
//       </>
//     );
//   }

//   // Show submitted timesheet if available and not forcing new form
//   if (isSubmitted && submittedTimesheet && !showNewForm) {
//     return <SubmittedTimesheet timesheetData={submittedTimesheet} onBackClick={handleBackFromSubmitted} />;
//   }

//   // Otherwise show the timesheet form (either not submitted or user clicked "Fill New")
//   return (
//     <>
//       <Box className="breadcrumb" sx={{ m: 1 }}>
//         <Breadcrumb routeSegments={[{ name: 'Timesheet' }]} />
//       </Box>
//       <Container>
//         {isSubmitted && (
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//             <Typography color="success.main">
//               You have already submitted your timesheet for this month.
//             </Typography>
//             <Button 
//               variant="outlined" 
//               color="primary" 
//               onClick={() => {
//                 setShowNewForm(false);
//                 setSubmittedTimesheet(null);
//                 // Reset login attempt flag when refreshing submitted timesheet
//                 hasAttemptedLogin.current = false;
//                 checkTimesheetStatus().then(async (statusData) => {
//                   if (!statusData.error && statusData.approvedFlag === 1) {
//                     const timesheetData = await getSubmittedTimesheetUrl();
//                     setSubmittedTimesheet(timesheetData);
//                   }
//                 });
//               }}
//             >
//               View Submitted Timesheet
//             </Button>
//           </Box>
//         )}
//         <Box sx={{ borderRadius: 1, overflow: 'hidden', height: isSubmitted ? 'calc(100% - 56px)' : '100%', boxShadow: 1 }}>
//           <iframe
//             ref={iframeRef}
//             src={TIMESHEET_URL}
//             title="Timesheet"
//             width="100%"
//             height="100%"
//             frameBorder="0"
//             onLoad={handleIframeLoad}
//           />
//         </Box>
//       </Container>
//     </>
//   );
// };

// export default Timesheet;






// Modified by arman khan







import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, CircularProgress, Typography, styled, Chip } from '@mui/material';
import { Breadcrumb } from 'app/components';
import { checkTimesheetStatus, getSubmittedTimesheetUrl } from '../../../../src/app/api/timesheet';
import SubmittedTimesheet from './SubmittedTimesheet';
import SnackbarUtils from 'SnackbarUtils';

// Proxy URL for embedding external timesheet form
const TIMESHEET_URL = '/timesheet-proxy/CLRA/loginTimesheet.php';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  height: 'calc(100vh - 180px)',
}));

const LoadingContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
});

const StatusChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: '20px',
  right: '20px',
  zIndex: 1000,
  fontSize: '0.75rem',
  fontWeight: 'bold',
}));

const Timesheet = () => {
  const [loading, setLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedTimesheet, setSubmittedTimesheet] = useState(null);
  const [timesheetStatus, setTimesheetStatus] = useState(null); // Store the full status data
  const [error, setError] = useState(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const iframeRef = useRef(null);
  const hasAttemptedLogin = useRef(false);
  
  // Handler for iframe load event
  const handleIframeLoad = () => {
    try {
      const iframe = iframeRef.current;
      if (!iframe || hasAttemptedLogin.current) return;
      
      // Give a little time for the iframe content to fully render
      setTimeout(() => {
        try {
          // Access the iframe content
          const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
          
          // Check if we're on the login page by looking for PAN input field
          const panInput = iframeDoc.querySelector('input[name="pan"]') || 
                          iframeDoc.querySelector('input#pan') || 
                          iframeDoc.querySelector('input[type="text"]');
          
          // If there's no PAN input, we're probably not on the login page
          if (!panInput) {
            console.warn("PAN input field not found - not attempting login");
            return;
          }
          
          // Get PAN number from localStorage
          const panNumber = localStorage.getItem('identityNo');
          
          if (!panNumber) {
            console.warn("No PAN number found in localStorage");
            return;
          }
          
          // Find the login button
          const loginButton = iframeDoc.querySelector('input[type="submit"]') || 
                             iframeDoc.querySelector('button[type="submit"]') ||
                             iframeDoc.querySelector('button:contains("Login")') ||
                             iframeDoc.querySelector('input[value="Login"]');
          
          // Set the PAN number value
          panInput.value = panNumber;
          
          // Trigger input event to activate any potential listeners
          const inputEvent = new Event('input', { bubbles: true });
          panInput.dispatchEvent(inputEvent);
          
          console.log("Autofilled PAN number");
          
          // If login button found, click it after a short delay
          if (loginButton) {
            setTimeout(() => {
              // Mark that we've attempted login to prevent multiple attempts
              hasAttemptedLogin.current = true;
              loginButton.click();
              console.log("Auto-clicked login button");
            }, 500);
          } else {
            console.warn("Login button not found in the iframe");
          }
        } catch (error) {
          console.error("Error accessing iframe content:", error);
        }
      }, 1000); // Delay to ensure content is fully loaded
    } catch (error) {
      console.error("Error in iframe load handler:", error);
    }
  };

  // Function to get status text and color based on approvedFlag
  const getStatusInfo = (approvedFlag) => {
    switch (approvedFlag) {
      case 2:
        return { text: "Pending Manager Approval", color: "warning" };
      case 3:
        return { text: "Sent To Manager", color: "info" };
      default:
        return { text: "Unknown Status", color: "default" };
    }
  };

  useEffect(() => {
    const checkStatus = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if timesheet is submitted
        const statusData = await checkTimesheetStatus();
        
        if (statusData.error) {
          setError(statusData.error);
          setLoading(false);
          return;
        }

        // Store the full status data
        setTimesheetStatus(statusData);

        // If approvedFlag is not 1, timesheet is submitted
        if (statusData.approvedFlag != 1) {
          setIsSubmitted(true);
          
          // Get submitted timesheet URL
          const timesheetData = await getSubmittedTimesheetUrl();
          if (timesheetData.error) {
            setError(timesheetData.error);
          } else {
            setSubmittedTimesheet(timesheetData);
          }
        } else {
          setIsSubmitted(false);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error in timesheet flow:', err);
        setError('Failed to load timesheet data. Please try again later.');
        setLoading(false);
      }
    };

    checkStatus();
    
    // Reset login attempt flag when component mounts
    hasAttemptedLogin.current = false;
    
    return () => {
      // Reset login attempt flag when component unmounts
      hasAttemptedLogin.current = false;
    };
  }, []);

  const handleBackFromSubmitted = () => {
    setShowNewForm(true);
    // Reset login attempt flag when switching to new form
    hasAttemptedLogin.current = false;
  };

  // Show loading state while checking timesheet status
  if (loading) {
    return (
      <>
        <Box className="breadcrumb" sx={{ m: 1 }}>
          <Breadcrumb routeSegments={[{ name: 'Timesheet' }]} />
        </Box>
        <Container>
          <LoadingContainer>
            <CircularProgress />
            <Typography sx={{ mt: 2 }}>Loading timesheet information...</Typography>
          </LoadingContainer>
        </Container>
      </>
    );
  }

  // Show error if any
  if (error && !showNewForm) {
    return (
      <>
        <Box className="breadcrumb" sx={{ m: 1 }}>
          <Breadcrumb routeSegments={[{ name: 'Timesheet' }]} />
        </Box>
        <Container>
          <LoadingContainer>
            <Typography color="error" variant="h6" gutterBottom>
              {error}
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => {
                setShowNewForm(true);
                // Reset login attempt flag when switching to new form
                hasAttemptedLogin.current = false;
              }}
              sx={{ mt: 2 }}
            >
              Fill New Timesheet
            </Button>
          </LoadingContainer>
        </Container>
      </>
    );
  }

  // Show submitted timesheet if available and not forcing new form
  if (isSubmitted && submittedTimesheet && !showNewForm) {
    return (
      <SubmittedTimesheet 
        timesheetData={submittedTimesheet} 
        onBackClick={handleBackFromSubmitted}
        statusInfo={timesheetStatus ? getStatusInfo(timesheetStatus.approvedFlag) : null}
      />
    );
  }

  // Otherwise show the timesheet form (either not submitted or user clicked "Fill New")
  return (
    <>
      <Box className="breadcrumb" sx={{ m: 1 }}>
        <Breadcrumb routeSegments={[{ name: 'Timesheet' }]} />
      </Box>
      <Container sx={{ position: 'relative' }}>
        {/* Show status chip if timesheet is submitted */}
        {isSubmitted && timesheetStatus && (
          <StatusChip
            label={getStatusInfo(timesheetStatus.approvedFlag).text}
            color={getStatusInfo(timesheetStatus.approvedFlag).color}
            variant="filled"
          />
        )}
        
        {isSubmitted && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography color="success.main">
              You have already submitted your timesheet for this month.
            </Typography>
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={() => {
                setShowNewForm(false);
                setSubmittedTimesheet(null);
                // Reset login attempt flag when refreshing submitted timesheet
                hasAttemptedLogin.current = false;
                checkTimesheetStatus().then(async (statusData) => {
                  if (!statusData.error && statusData.approvedFlag === 1) {
                    const timesheetData = await getSubmittedTimesheetUrl();
                    setSubmittedTimesheet(timesheetData);
                  }
                });
              }}
            >
              View Submitted Timesheet
            </Button>
          </Box>
        )}
        <Box sx={{ borderRadius: 1, overflow: 'hidden', height: isSubmitted ? 'calc(100% - 56px)' : '100%', boxShadow: 1 }}>
          <iframe
            ref={iframeRef}
            src={TIMESHEET_URL}
            title="Timesheet"
            width="100%"
            height="100%"
            frameBorder="0"
            onLoad={handleIframeLoad}
          />
        </Box>
      </Container>
    </>
  );
};

export default Timesheet;
