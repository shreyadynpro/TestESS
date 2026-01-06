import React, { useState, useEffect, useRef } from 'react';
import { styled, Card, CardContent, Grid, Typography, Box } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getAccessToken } from 'app/utils/utils';
import commonConfig from './commonConfig';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StyledProfileCard = styled(Card)(({ theme }) => ({
  marginTop: '20px',
  borderRadius: '15px',
  backgroundColor: '#1a2038',
  color: '#fff',
  textAlign: 'center',
  padding: '0px',
}));

const CustomCalendar = styled(Calendar)(({ theme }) => ({
  backgroundColor: '#2c2f38',
  borderRadius: '15px',
  border: 'none',
  padding: '10px',
  width: '100%',
  '& .react-calendar__month-view__days__day': {
    borderRadius: '10px',
    padding: '8px',
  },
  '& .react-calendar__tile': {
    borderRadius: '10px',
    transition: 'background-color 0.3s, color 0.3s',
    position: 'relative',
  },
  '& .react-calendar__tile--active': {
    background: '#ff5722',
    color: '#fff',
  },
  '& .react-calendar__tile--now': {
    background: '#ffccbc',
    color: '#000',
  },
}));

const StyledClock = styled(Typography)(({ theme }) => ({
  color: '#ffffff',
  fontFamily: 'serif',
  fontWeight: 'bold',
  fontSize: '1.5rem',
  textAlign: 'left',
  borderRadius: '10px',
  padding: '10px',
}));

const CalenderCard = () => {
  const navigate = useNavigate();
  const hideTimeoutRef = useRef(null);

  const [hoveredDate, setHoveredDate] = useState(null);
  const [popupPosition, setPopupPosition] = useState({
    tileRight: 0,
    tileTop: 0,
    tileBottom: 0,
    tileCenterY: 0,
  });

  const [showPopup, setShowPopup] = useState(false); // New state for delay
  const isDateAllowed = (date) => {
    const today = new Date();
    const diff = (today - date) / (1000 * 60 * 60 * 24);
    return diff <= 15;
  };

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [leaveBalance, setLeaveBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
      setTime(now);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchLeaveBalance = async () => {
      try {
        setLoading(true);
        const authToken = getAccessToken();
        const response = await axios(commonConfig.urls.getleavedata, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });
        const leaveCount = response?.data?.Response?.[0]?.user_leave_count || 0;
        setLeaveBalance(leaveCount);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch leave balance:', error);
        setLoading(false);
      }
    };
    fetchLeaveBalance();
  }, []);

  const handleDateChange = (newDate) => setDate(newDate);

  const clearHideTimeout = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  const handleTileMouseEnter = (tileDate, event) => {
    clearHideTimeout();
    const rect = event.currentTarget.getBoundingClientRect();
    setPopupPosition({
      tileRight: rect.right,
      tileTop: rect.top,
      tileBottom: rect.bottom,
      tileCenterY: rect.top + rect.height / 2,
    });
    setHoveredDate(tileDate);
  };

  const handleTileMouseLeave = () => {
    clearHideTimeout();
    hideTimeoutRef.current = setTimeout(() => {
      setHoveredDate(null);
      setShowPopup(false);
    }, 300);
  };

  const handlePopupMouseEnter = () => clearHideTimeout();
  const handlePopupMouseLeave = () => {
    clearHideTimeout();
    hideTimeoutRef.current = setTimeout(() => {
      setHoveredDate(null);
      setShowPopup(false);
    }, 100);
  };

  // Show popup with 150ms delay
  useEffect(() => {
    if (hoveredDate) {
      const timer = setTimeout(() => setShowPopup(true), 150);
      return () => clearTimeout(timer);
    } else {
      setShowPopup(false);
    }
  }, [hoveredDate]);

  useEffect(() => {
    return () => clearHideTimeout();
  }, []);

  return (
    <>
      <StyledProfileCard>
        <CardContent>
          <Grid container spacing={1} alignItems="stretch">
            <Grid item xs={8}>
              <CustomCalendar
                onChange={handleDateChange}
                value={date}
                tileContent={({ date: tileDate, view }) => {
                  if (view !== 'month') return null;
                  const allowed = isDateAllowed(tileDate);
                  if (!allowed) return null;

                  return (
                    <div
                      onMouseEnter={(e) => handleTileMouseEnter(tileDate, e)}
                      onMouseLeave={handleTileMouseLeave}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 1,
                      }}
                    />
                  );
                }}
              />
            </Grid>

            {/* Right side clock + leave balance */}
            <Grid
              item
              xs={4}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                flexDirection: 'column',
                minHeight: '100%',
                paddingTop: '10px',
                gap: '15px',
              }}
            >
              <Box>
                <StyledClock>{time}</StyledClock>
              </Box>
              <Box
                sx={{
                  backgroundColor: 'rgba(255, 107, 107, 0.15)',
                  borderLeft: '4px solid #ff6b6b',
                  padding: '12px 10px',
                  borderRadius: '8px',
                  width: '100%',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    color: '#b0bec5',
                    fontSize: '0.75rem',
                    marginBottom: '4px',
                  }}
                >
                  LEAVE BALANCE
                </Typography>
                <Typography
                  sx={{
                    color: '#ffffff',
                    fontWeight: 'bold',
                    fontSize: '1.8rem',
                    textAlign: 'center',
                  }}
                >
                  {loading ? '-' : leaveBalance}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#b0bec5',
                    fontSize: '0.7rem',
                    display: 'block',
                    marginTop: '2px',
                  }}
                >
                  {loading ? 'Loading...' : 'days remaining'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </StyledProfileCard>

      {/* Invisible bridge + close popup that NEVER loses hover */}
      {hoveredDate && showPopup && (
        <>
          {/* Invisible bridge from tile to popup */}
          <div
            style={{
              position: 'fixed',
              left: popupPosition.tileRight,
              top: popupPosition.tileTop,
              width: 40, // bridge width
              height: popupPosition.tileBottom - popupPosition.tileTop,
              zIndex: 99998,
              cursor: 'pointer',
            }}
            onMouseEnter={handlePopupMouseEnter}
          />

          <div
            onMouseEnter={handlePopupMouseEnter}
            onMouseLeave={handlePopupMouseLeave}
            style={{
              position: 'fixed',
              left: `${popupPosition.tileRight + 8}px`,
              top: `${popupPosition.tileCenterY}px`,
              transform: 'translateY(-50%)',
              background: '#ffffff',
              color: '#1565c0',
              padding: '10px 18px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              boxShadow: '0 8px 25px rgba(0,0,0,0.25)',
              zIndex: 99999,
              border: '1px solid #e0e0e0',
              pointerEvents: 'auto',
            }}
            onClick={() => {
              const selected = hoveredDate.toLocaleDateString('en-CA'); // This will give YYYY-MM-DD in local time
              const duration = encodeURIComponent('Full Day');
              navigate(`/leaveapply?selected_date=${selected}&auto_duration=${duration}`);
            }}
          >
            Apply leave
          </div>
        </>
      )}
    </>
  );
};

export default CalenderCard;