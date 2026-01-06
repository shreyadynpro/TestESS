'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  styled,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';

import ProfileSummaryCard from './ProfileSummaryCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import commonConfig from './commonConfig';
import { getAccessToken } from 'app/utils/utils';

import DownloadIcon from '@mui/icons-material/CloudDownload';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GroupsIcon from '@mui/icons-material/Groups';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import CalenderCard from './CalenderCard';
import HolidayCard from './HolidayCard';

// ---------------------- Styled Section ---------------------------

const TopBanner = styled('div')(() => ({
  width: '100%',
  background: '#1a2038',
  borderRadius: '16px',
  padding: '40px',
  color: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '30px',
}));

const RightButtons = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
}));

const BannerButton = styled(Button)(() => ({
  backgroundColor: 'rgba(255, 255, 255, 0.12)',
  color: 'white',
  padding: '10px 18px',
  justifyContent: 'flex-start',
  borderRadius: '10px',
  fontWeight: 500,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
}));

const TagPill = styled('div')(() => ({
  display: 'inline-block',
  padding: '6px 12px',
  backgroundColor: 'rgba(255,255,255,0.2)',
  borderRadius: '6px',
  fontSize: '14px',
  marginTop: '6px',
}));

// ---------------------- Payslip Card ---------------------------

const PayslipWrapper = styled(Card)(() => ({
  marginTop: '20px',
  padding: '8px',
  borderRadius: '15px',
  backgroundColor: '#1a2038',
  color: 'white',
}));

const StyledIcon = styled(DownloadIcon)(() => ({
  color: '#FFA500',
}));

const PayslipCard = () => {
  const [months, setMonths] = useState([]);
  const authToken = getAccessToken();
  const navigate = useNavigate();

  useEffect(() => {
    const loadMonths = async () => {
      try {
        const response = await axios(commonConfig.urls.getLetestPayslipMonths, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setMonths(response.data?.Response || []);
      } catch (err) {
        console.error('Error loading payslips', err);
      }
    };
    loadMonths();
  }, []);

  const downloadPayslip = async (slip) => {
    const [month, year] = slip.split(' ');
    try {
      const response = await axios.get(`${commonConfig.urls.generatePayslipPdf}/${month}/${year}`, {
        headers: { Authorization: `Bearer ${authToken}` },
        responseType: 'blob',
      });

      const url = URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.download = `${slip}.pdf`;
      link.click();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <PayslipWrapper>
      <CardContent>
        <Typography variant="h6" align="center" gutterBottom>
          Salary Slips
        </Typography>

        {months.length > 0 ? (
          <Grid container spacing={2}>
            {[0, 4].map((start) => (
              <Grid key={start} item xs={6}>
                <List dense>
                  {months.slice(start, start + 4).map((m) => (
                    <ListItem key={m.month_year}>
                      <ListItemText primary={m.month_year} />
                      <ListItemIcon>
                        <Button onClick={() => downloadPayslip(m.month_year)}>
                          <StyledIcon />
                        </Button>
                      </ListItemIcon>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>No payslips available.</Typography>
        )}

        <Button
          variant="outlined"
          color="secondary"
          style={{ marginTop: '12px' }}
          onClick={() => navigate('/salary/payslip/payslips')}
        >
          View All
        </Button>
      </CardContent>
    </PayslipWrapper>
  );
};

// ---------------------- Thought of the Day Engine ----------------------

const dynproCategories = {
  motivation: ['motivation', 'inspire', 'dream', 'hope', 'courage', 'mindset'],
  leadership: ['lead', 'vision', 'influence', 'mentor', 'guide', 'decision'],
  teamwork: ['team', 'together', 'collaborate', 'unity', 'support'],
  discipline: ['discipline', 'habit', 'consistency', 'routine', 'focus'],
  innovation: ['technology', 'innovation', 'creative', 'future', 'change'],
  success: ['success', 'achievement', 'goal', 'growth', 'result'],
  integrity: ['integrity', 'honest', 'ethics', 'truth', 'values'],
};

function categorizeQuote(text) {
  const t = text.toLowerCase();
  for (const [category, keywords] of Object.entries(dynproCategories)) {
    if (keywords.some((k) => t.includes(k))) return category;
  }
  return 'general';
}

function getDailyIndex(totalCount) {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  );
  return dayOfYear % totalCount;
}

// ---------------------- Homepage ---------------------------

const dummyAnnouncements = [
  {
    id: 1,
    title: 'Leadership Announcement - Madhup Agrawal',
    date: 'Dec 17, 2025',
    description: 'We are pleased to announce Madhup Agrawal as our new Chief Technology Officer.',
    image: '/assets/images/announcement-1.jpg',
  },
  {
    id: 2,
    title: 'Office Timings Update',
    date: 'Dec 20, 2025',
    description: 'Starting next week, office timings will be 9:00 AM to 6:00 PM.',
    image: '/assets/images/announcement-2.jpg',
  },
  {
    id: 3,
    title: 'New Year Celebrations',
    date: 'Dec 30, 2025',
    description: 'Join us for our annual New Year celebration on December 31st at 7:00 PM.',
    image: '/assets/images/announcement-3.jpg',
  },
];

const dummyEvents = [
  {
    id: 1,
    title: 'Christmas Celebration & Secret Santa',
    date: 'Dec 15, 2025',
    time: 'All Day Event',
    description:
      'Join us for a joyful Christmas celebration including Secret Santa, theme days, and a festive Potluck.',
    location: 'Office Premises',
    month: 'DEC',
    day: '15',
  },
  {
    id: 2,
    title: 'Year End Review Meeting',
    date: 'Dec 28, 2025',
    time: '2:00 PM - 4:00 PM',
    description:
      'Annual year-end review meeting to discuss achievements and goals for the upcoming year.',
    location: 'Conference Room A',
    month: 'DEC',
    day: '28',
  },
];

export default function Homepage() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userDetails?.user);
  const [roleId, setRoleId] = useState(null);
  const [thoughtOfTheDay, setThoughtOfTheDay] = useState('');
  const [thoughtCategory, setThoughtCategory] = useState('');
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);

  const currentAnnouncement = dummyAnnouncements[currentAnnouncementIndex];

  const handleNextAnnouncement = () => {
    setCurrentAnnouncementIndex((prev) => (prev === dummyAnnouncements.length - 1 ? 0 : prev + 1));
  };

  const handlePrevAnnouncement = () => {
    setCurrentAnnouncementIndex((prev) => (prev === 0 ? dummyAnnouncements.length - 1 : prev - 1));
  };

  useEffect(() => {
    setRoleId(localStorage.getItem('roleId'));

    const fetchThought = async () => {
      try {
        const res = await fetch('https://api.api-ninjas.com/v2/quoteoftheday', {
          headers: {
            'X-Api-Key': 'AH5iYd7mffjXrDxuGJy33w==eQppZs2XgSCmi6Op',
          },
        });

        const data = await res.json();

        const quote = data?.quote || 'Stay motivated and focused!';

        setThoughtOfTheDay(quote);
        setThoughtCategory(categorizeQuote(quote));
      } catch (err) {
        console.error('Error loading Thought of the Day', err);
      }
    };

    fetchThought();
  }, []);

  const userName = user?.first_name || 'User';
  const userRole = user?.dpro_designation_offered || user?.designation_name || 'Employee';

  const greeting = (() => {
    const hr = new Date().getHours();
    if (hr < 12) return 'Good Morning';
    if (hr < 18) return 'Good Afternoon';
    return 'Good Evening';
  })();

  const shouldShowPayslip = () => !['9', '10', '11'].includes(String(roleId));

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
      {/* ---------------- TOP BANNER ---------------- */}
      <TopBanner>
        {/* LEFT SECTION */}
        <div>
          <img
            src="/assets/dynpro.png"
            alt="DynPro"
            style={{ width: '160px', marginBottom: '10px', transform: 'scale(1.5)' }}
          />

          <Typography variant="h4" fontWeight={700} style={{ marginBottom: '8px' }}>
            {greeting}, {userName}
          </Typography>

          <Typography variant="subtitle1" style={{ opacity: 0.9 }}>
            {userRole}
          </Typography>

          {/* Thought of the Day */}
          <TagPill style={{ textAlign: 'left', maxWidth: '400px', whiteSpace: 'normal' }}>
            <div
              style={{
                fontSize: '1rem',
                marginBottom: '2px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>💭</span>
              <span>Thought of the Day</span>
            </div>

            <div style={{ fontStyle: 'italic' }}>"{thoughtOfTheDay}"</div>

            <div
              style={{
                marginTop: '6px',
                opacity: 0.8,
                fontSize: '13px',
                textTransform: 'capitalize',
              }}
            >
              Category: {thoughtCategory}
            </div>
          </TagPill>

          <Typography variant="h6" style={{ marginTop: '14px', fontWeight: 600 }}>
            Welcome to DynESS
          </Typography>
        </div>

        {/* RIGHT SECTION BUTTONS */}
        <RightButtons>
          <BannerButton startIcon={<FavoriteIcon />}>Our Culture</BannerButton>
          <BannerButton startIcon={<GroupsIcon />}>Our People</BannerButton>
          <BannerButton startIcon={<AccountTreeIcon />} onClick={() => navigate('/orgchart')}>
            Org Chart
          </BannerButton>
        </RightButtons>
      </TopBanner>

      {/* ---------------- UPCOMING EVENTS + ANNOUNCEMENTS ---------------- */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
        {/* EVENTS CARD */}
        <Card
          style={{
            backgroundColor: '#1a2038',
            color: 'white',
            borderRadius: '12px',
            padding: '16px',
            flex: 1,
            maxHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px',
            }}
          >
            <Typography variant="h6" style={{ fontWeight: 600 }}>
              Upcoming Events
            </Typography>
            <Typography variant="body2" style={{ color: '#3f51b5', cursor: 'pointer' }}>
              See all
            </Typography>
          </div>

          {dummyEvents.map((event) => (
            <Card
              key={event.id}
              style={{
                backgroundColor: '#2a3042',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                gap: '16px',
                marginBottom: '12px',
                maxHeight: '300px',
                overflowY: 'auto',
              }}
            >
              <div
                style={{
                  backgroundColor: event.id === 1 ? '#3f51b5' : '#4caf50',
                  borderRadius: '8px',
                  padding: '8px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '70px',
                }}
              >
                <Typography
                  variant="h4"
                  style={{ fontWeight: 700, lineHeight: 1, fontSize: '1rem' }}
                >
                  {event.month}
                </Typography>
                <Typography
                  variant="h3"
                  style={{ fontWeight: 700, lineHeight: 1, fontSize: '1.5rem' }}
                >
                  {event.day}
                </Typography>
              </div>

              <div style={{ flex: 1 }}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: 600, marginBottom: '2px', fontSize: '0.95rem' }}
                >
                  {event.title}
                </Typography>
                <Typography
                  variant="caption"
                  style={{
                    color: '#b0b0b0',
                    display: 'block',
                    marginBottom: '4px',
                    fontSize: '0.75rem',
                  }}
                >
                  {event.date} • {event.time}
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    color: '#b0b0b0',
                    marginBottom: '8px',
                    fontSize: '0.8rem',
                    opacity: 0.9,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {event.description}
                </Typography>
                <div
                  style={{
                    display: 'inline-block',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    padding: '2px 6px',
                    borderRadius: '3px',
                    fontSize: '0.7rem',
                  }}
                >
                  {event.location}
                </div>
              </div>
            </Card>
          ))}
        </Card>

        {/* ANNOUNCEMENTS CARD */}
        <Card
          style={{
            backgroundColor: '#1a2038',
            color: 'white',
            borderRadius: '12px',
            padding: '16px',
            flex: 1,
            maxHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px',
            }}
          >
            <Typography variant="h6" style={{ fontWeight: 600 }}>
              Announcements
            </Typography>
            <Typography variant="body2" style={{ color: '#3f51b5', cursor: 'pointer' }}>
              See all
            </Typography>
          </div>

          <div
            style={{
              backgroundColor: '#2a3042',
              borderRadius: '12px',
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '140px',
                backgroundColor: '#3a3f52',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <img
                src={currentAnnouncement.image}
                alt="Announcement"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.8,
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgNDAwIDIwMCI+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzNhM2Y1MiIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM4ODgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Bbm5vdW5jZW1lbnQgSW1hZ2U8L3RleHQ+Cjwvc3ZnPg==';
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  bottom: '15px',
                  left: '15px',
                  right: '15px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
                  padding: '20px 16px 16px',
                  color: 'white',
                }}
              >
                <Typography variant="body1" style={{ fontWeight: 500, margin: 0 }}>
                  {currentAnnouncement.title}
                </Typography>
                <Typography
                  variant="caption"
                  style={{ opacity: 0.8, display: 'block', marginTop: '4px' }}
                >
                  {currentAnnouncement.date}
                </Typography>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                backgroundColor: '#2a3042',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                }}
              >
                {dummyAnnouncements.map((_, index) => (
                  <div
                    key={index}
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor:
                        index === currentAnnouncementIndex ? '#3f51b5' : 'rgba(255,255,255,0.3)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onClick={() => setCurrentAnnouncementIndex(index)}
                  />
                ))}
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={handlePrevAnnouncement}
                >
                  <ArrowBackIosNewIcon style={{ color: 'white', fontSize: '14px' }} />
                </div>

                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={handleNextAnnouncement}
                >
                  <ArrowForwardIosIcon style={{ color: 'white', fontSize: '14px' }} />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* ------------------ CONTENT GRID ------------------ */}

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <ProfileSummaryCard />
        </Grid>

        {user?.dynmis_empid && shouldShowPayslip() && (
          <Grid item xs={12} sm={4}>
            <PayslipCard />
          </Grid>
        )}

        <Grid item xs={12} sm={4}>
          <CalenderCard />
        </Grid>

        <Grid item xs={12} md={8}>
          <HolidayCard />
        </Grid>

        <Grid item xs={12} md={4}>
          <div style={{ marginTop: '24px' }}>
            <img
              src="/assets/images/311.jpg"
              alt="Greeting"
              style={{
                width: '100%',
                borderRadius: '15px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              }}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
