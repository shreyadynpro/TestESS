// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import Changelog from './changelog';
// import {
//   styled,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Grid,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
// } from '@mui/material';

// import ProfileSummaryCard from './ProfileSummaryCard';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import commonConfig from './commonConfig';
// import { getAccessToken } from 'app/utils/utils';
// import WhatsNew from './WhatsNew/WhatsNew';
// import NewReleasesIcon from '@mui/icons-material/NewReleases';
// import DownloadIcon from '@mui/icons-material/CloudDownload';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import GroupsIcon from '@mui/icons-material/Groups';
// import AccountTreeIcon from '@mui/icons-material/AccountTree';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// import CalenderCard from './CalenderCard';
// import HolidayCard from './HolidayCard';

// /* ---------------------- Styled Components --------------------------- */

// const TopBanner = styled('div')(() => ({
//   width: '100%',
//   background: '#1a2038',
//   borderRadius: '16px',
//   padding: '40px',
//   color: 'white',
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'flex-start',
//   marginBottom: '30px',
// }));

// const RightButtons = styled('div')(() => ({
//   display: 'flex',
//   flexDirection: 'column',
//   gap: '12px',
// }));

// const BannerButton = styled(Button)(() => ({
//   backgroundColor: 'rgba(255, 255, 255, 0.12)',
//   color: 'white',
//   padding: '10px 18px',
//   justifyContent: 'flex-start',
//   borderRadius: '10px',
//   fontWeight: 500,
//   textTransform: 'none',
//   '&:hover': {
//     backgroundColor: 'rgba(255,255,255,0.2)',
//   },
// }));

// const TagPill = styled('div')(() => ({
//   display: 'inline-block',
//   padding: '6px 12px',
//   backgroundColor: 'rgba(255,255,255,0.2)',
//   borderRadius: '6px',
//   fontSize: '14px',
//   marginTop: '6px',
// }));

// /* ---------------------- Payslip Card --------------------------- */

// const PayslipWrapper = styled(Card)(() => ({
//   marginTop: '20px',
//   padding: '8px',
//   borderRadius: '15px',
//   backgroundColor: '#1a2038',
//   color: 'white',
// }));

// const StyledIcon = styled(DownloadIcon)(() => ({
//   color: '#FFA500',
// }));

// const PayslipCard = () => {
//   const [months, setMonths] = useState([]);
//   const authToken = getAccessToken();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loadMonths = async () => {
//       try {
//         const response = await axios(commonConfig.urls.getLetestPayslipMonths, {
//           headers: { Authorization: `Bearer ${authToken}` },
//         });
//         setMonths(response.data?.Response || []);
//       } catch (err) {
//         console.error('Error loading payslips', err);
//       }
//     };
//     loadMonths();
//   }, []);

//   const downloadPayslip = async (slip) => {
//     const [month, year] = slip.split(' ');
//     try {
//       const response = await axios.get(`${commonConfig.urls.generatePayslipPdf}/${month}/${year}`, {
//         headers: { Authorization: `Bearer ${authToken}` },
//         responseType: 'blob',
//       });

//       const url = URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = `${slip}.pdf`;
//       link.click();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <PayslipWrapper>
//       <CardContent>
//         <Typography variant="h6" align="center" gutterBottom>
//           Salary Slips
//         </Typography>

//         {months.length > 0 ? (
//           <Grid container spacing={2}>
//             {[0, 4].map((start) => (
//               <Grid key={start} item xs={6}>
//                 <List dense>
//                   {months.slice(start, start + 4).map((m) => (
//                     <ListItem key={m.month_year}>
//                       <ListItemText primary={m.month_year} />
//                       <ListItemIcon>
//                         <Button onClick={() => downloadPayslip(m.month_year)}>
//                           <StyledIcon />
//                         </Button>
//                       </ListItemIcon>
//                     </ListItem>
//                   ))}
//                 </List>
//               </Grid>
//             ))}
//           </Grid>
//         ) : (
//           <Typography>No payslips available.</Typography>
//         )}

//         <Button
//           variant="outlined"
//           color="secondary"
//           style={{ marginTop: '12px' }}
//           onClick={() => navigate('/salary/payslip/payslips')}
//         >
//           View All
//         </Button>
//       </CardContent>
//     </PayslipWrapper>
//   );
// };

// /* ---------------------- Thought of the Day Engine ---------------------- */

// const dynproCategories = {
//   motivation: ['motivation', 'inspire', 'dream', 'hope', 'courage', 'mindset'],
//   leadership: ['lead', 'vision', 'influence', 'mentor', 'guide', 'decision'],
//   teamwork: ['team', 'together', 'collaborate', 'unity', 'support'],
//   discipline: ['discipline', 'habit', 'consistency', 'routine', 'focus'],
//   innovation: ['technology', 'innovation', 'creative', 'future', 'change'],
//   success: ['success', 'achievement', 'goal', 'growth', 'result'],
//   integrity: ['integrity', 'honest', 'ethics', 'truth', 'values'],
// };

// function categorizeQuote(text) {
//   const t = text.toLowerCase();
//   for (const [category, keywords] of Object.entries(dynproCategories)) {
//     if (keywords.some((k) => t.includes(k))) return category;
//   }
//   return 'general';
// }

// /* ---------------------- Dummy Data --------------------------- */

// const dummyAnnouncements = [
//   {
//     id: 1,
//     title: 'Leadership Announcement - Madhup Agrawal',
//     date: 'Dec 17, 2025',
//     description: 'We are pleased to announce Madhup Agrawal as our new Chief Technology Officer.',
//     image: '/assets/images/announcement-1.jpg',
//   },
//   {
//     id: 2,
//     title: 'Office Timings Update',
//     date: 'Dec 20, 2025',
//     description: 'Starting next week, office timings will be 9:00 AM to 6:00 PM.',
//     image: '/assets/images/announcement-2.jpg',
//   },
//   {
//     id: 3,
//     title: 'New Year Celebrations',
//     date: 'Dec 30, 2025',
//     description: 'Join us for our annual New Year celebration on December 31st at 7:00 PM.',
//     image: '/assets/images/announcement-3.jpg',
//   },
// ];

// const dummyEvents = [
//   {
//     id: 1,
//     title: 'Christmas Celebration & Secret Santa',
//     date: 'Dec 15, 2025',
//     time: 'All Day Event',
//     description:
//       'Join us for a joyful Christmas celebration including Secret Santa, theme days, and a festive Potluck.',
//     location: 'Office Premises',
//     month: 'DEC',
//     day: '15',
//   },
//   {
//     id: 2,
//     title: 'Year End Review Meeting',
//     date: 'Dec 28, 2025',
//     time: '2:00 PM - 4:00 PM',
//     description:
//       'Annual year-end review meeting to discuss achievements and goals for the upcoming year.',
//     location: 'Conference Room A',
//     month: 'DEC',
//     day: '28',
//   },
// ];

// /* ---------------------- Homepage Component ---------------------- */

// export default function Homepage() {
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.userDetails?.user);

//   const [roleId, setRoleId] = useState(null);
//   const [thoughtOfTheDay, setThoughtOfTheDay] = useState('');
//   const [thoughtCategory, setThoughtCategory] = useState('');
//   const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
//   const [openWhatsNew, setOpenWhatsNew] = useState(false);

//   const currentAnnouncement = dummyAnnouncements[currentAnnouncementIndex];

//   const handleNextAnnouncement = () => {
//     setCurrentAnnouncementIndex((prev) => (prev === dummyAnnouncements.length - 1 ? 0 : prev + 1));
//   };

//   const handlePrevAnnouncement = () => {
//     setCurrentAnnouncementIndex((prev) => (prev === 0 ? dummyAnnouncements.length - 1 : prev - 1));
//   };

//   const handleOpenWhatsNew = () => {
//     setOpenWhatsNew(true);
//     localStorage.setItem('lastSeenVersion', '1.0.0');
//   };

//   /* ---------------- Fetch Thought of the Day ---------------- */

//   useEffect(() => {
//     setRoleId(localStorage.getItem('roleId'));

//     const fetchThought = async () => {
//       try {
//         const today = new Date().toISOString().split('T')[0];
//         const storedThought = localStorage.getItem('thoughtOfTheDay');
//         const storedDate = localStorage.getItem('thoughtDate');

//         if (storedThought && storedDate === today) {
//           const { quote, category } = JSON.parse(storedThought);
//           setThoughtOfTheDay(quote);
//           setThoughtCategory(category);
//           return;
//         }

//         const res = await fetch('https://api.api-ninjas.com/v2/quoteoftheday', {
//           headers: {
//             'X-Api-Key': 'AH5iYd7mffjXrDxuGJy33w==eQppZs2XgSCmi6Op',
//           },
//         });

//         const data = await res.json();
//         const quote = data?.quote || 'Stay motivated and focused!';
//         const category = categorizeQuote(quote);

//         const thoughtData = { quote, category };
//         localStorage.setItem('thoughtOfTheDay', JSON.stringify(thoughtData));
//         localStorage.setItem('thoughtDate', today);

//         setThoughtOfTheDay(quote);
//         setThoughtCategory(category);
//       } catch (err) {
//         console.error('Error loading Thought of the Day', err);
//         setThoughtOfTheDay('Stay motivated and focused!');
//         setThoughtCategory('motivation');
//       }
//     };

//     fetchThought();
//   }, []);

//   const userName = user?.first_name || 'User';
//   const userRole = user?.dpro_designation_offered || user?.designation_name || 'Employee';

//   const greeting = (() => {
//     const hr = new Date().getHours();
//     if (hr < 12) return 'Good Morning';
//     if (hr < 18) return 'Good Afternoon';
//     return 'Good Evening';
//   })();

//   const shouldShowPayslip = () => !['9', '10', '11'].includes(String(roleId));

//   return (
//     <div style={{ padding: '20px', backgroundColor: '#f5f5f5', position: 'relative' }}>
//       {/* Changelog Component */}
//       <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
//         <Changelog />
//       </div>

//       {/* ---------------- TOP BANNER ---------------- */}
//       <TopBanner>
//         <div>
//           <img
//             src="/assets/dynpro.png"
//             alt="DynPro"
//             style={{
//               width: '160px',
//               marginBottom: '10px',
//               transform: 'scale(1.5)',
//             }}
//           />

//           <Typography variant="h4" fontWeight={700} style={{ marginBottom: '8px' }}>
//             {greeting}, {userName}
//           </Typography>

//           <Typography variant="subtitle1" style={{ opacity: 0.9 }}>
//             {userRole}
//           </Typography>

//           {/* Thought of the Day */}
//           <TagPill style={{ maxWidth: '400px' }}>
//             <div
//               style={{
//                 fontSize: '1rem',
//                 marginBottom: '2px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px',
//               }}
//             >
//               <span>💭</span>
//               <span>Thought of the Day</span>
//             </div>

//             <div style={{ fontStyle: 'italic' }}>"{thoughtOfTheDay}"</div>

//             <div
//               style={{
//                 marginTop: '6px',
//                 opacity: 0.8,
//                 fontSize: '13px',
//                 textTransform: 'capitalize',
//               }}
//             >
//               Category: {thoughtCategory}
//             </div>
//           </TagPill>

//           <Typography variant="h6" style={{ marginTop: '14px', fontWeight: 600 }}>
//             Welcome to DynESS
//           </Typography>
//         </div>

//         <RightButtons>
//           <BannerButton startIcon={<FavoriteIcon />}>Our Culture</BannerButton>
//           <BannerButton startIcon={<GroupsIcon />}>Our People</BannerButton>
//           <BannerButton startIcon={<AccountTreeIcon />} onClick={() => navigate('/orgchart')}>
//             Org Chart
//           </BannerButton>
//         </RightButtons>
//       </TopBanner>

//       {/* ---------------- EVENTS + ANNOUNCEMENTS ---------------- */}
//       <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
//         {/* EVENTS CARD */}
//         <Card
//           style={{
//             backgroundColor: '#1a2038',
//             color: 'white',
//             borderRadius: '12px',
//             padding: '16px',
//             flex: 1,
//             maxHeight: '400px',
//             display: 'flex',
//             flexDirection: 'column',
//           }}
//         >
//           <div
//             style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               marginBottom: '12px',
//             }}
//           >
//             <Typography variant="h6" style={{ fontWeight: 600 }}>
//               Upcoming Events
//             </Typography>
//             <Typography variant="body2" style={{ color: '#3f51b5', cursor: 'pointer' }}>
//               See all
//             </Typography>
//           </div>

//           {dummyEvents.map((event) => (
//             <Card
//               key={event.id}
//               style={{
//                 backgroundColor: '#2a3042',
//                 borderRadius: '12px',
//                 padding: '16px',
//                 display: 'flex',
//                 gap: '16px',
//                 marginBottom: '12px',
//               }}
//             >
//               <div
//                 style={{
//                   backgroundColor: event.id === 1 ? '#3f51b5' : '#4caf50',
//                   borderRadius: '8px',
//                   padding: '8px 10px',
//                   minWidth: '70px',
//                   textAlign: 'center',
//                 }}
//               >
//                 <Typography variant="h4" style={{ fontSize: '1rem', fontWeight: 700 }}>
//                   {event.month}
//                 </Typography>
//                 <Typography variant="h3" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
//                   {event.day}
//                 </Typography>
//               </div>

//               <div style={{ flex: 1 }}>
//                 <Typography
//                   variant="subtitle1"
//                   style={{ fontWeight: 600, color: 'white', marginBottom: '2px' }}
//                 >
//                   {event.title}
//                 </Typography>

//                 <Typography
//                   variant="caption"
//                   style={{ color: 'white', marginBottom: '4px', display: 'block' }}
//                 >
//                   {event.date} • {event.time}
//                 </Typography>

//                 <Typography
//                   variant="body2"
//                   style={{
//                     color: '#b0b0b0',
//                     opacity: 0.9,
//                     marginBottom: '8px',
//                     display: '-webkit-box',
//                     WebkitLineClamp: 2,
//                     WebkitBoxOrient: 'vertical',
//                     overflow: 'hidden',
//                   }}
//                 >
//                   {event.description}
//                 </Typography>

//                 <div
//                   style={{
//                     display: 'inline-block',
//                     backgroundColor: 'rgba(255,255,255,0.1)',
//                     padding: '2px 6px',
//                     borderRadius: '3px',
//                     fontSize: '0.7rem',
//                     color: 'white',
//                   }}
//                 >
//                   {event.location}
//                 </div>
//               </div>
//             </Card>
//           ))}
//         </Card>

//         {/* ---------------- ANNOUNCEMENTS CARD ---------------- */}
//         <Card
//           style={{
//             backgroundColor: '#1a2038',
//             color: 'white',
//             borderRadius: '12px',
//             padding: '16px',
//             flex: 1,
//             maxHeight: '400px',
//             display: 'flex',
//             flexDirection: 'column',
//           }}
//         >
//           <div
//             style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               marginBottom: '12px',
//             }}
//           >
//             <Typography variant="h6" style={{ fontWeight: 600 }}>
//               Announcements
//             </Typography>
//             <Typography variant="body2" style={{ color: '#3f51b5', cursor: 'pointer' }}>
//               See all
//             </Typography>
//           </div>

//           <div
//             style={{
//               backgroundColor: '#2a3042',
//               borderRadius: '12px',
//               overflow: 'hidden',
//               flex: 1,
//               display: 'flex',
//               flexDirection: 'column',
//             }}
//           >
//             <div
//               style={{
//                 width: '100%',
//                 height: '140px',
//                 position: 'relative',
//                 backgroundColor: '#3a3f52',
//               }}
//             >
//               <img
//                 src={currentAnnouncement.image}
//                 alt="Announcement"
//                 style={{
//                   width: '100%',
//                   height: '100%',
//                   objectFit: 'cover',
//                   opacity: 0.8,
//                 }}
//                 onError={(e) => {
//                   e.target.src =
//                     'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgNDAwIDIwMCI+PGNpcmNsZSByPSIyMDAiIGN4PSIyMDAiIGN5PSIxMDAiIGZpbGw9IiMzYTNmNTIiIC8+PC9zdmc+';
//                 }}
//               />

//               <div
//                 style={{
//                   position: 'absolute',
//                   bottom: '15px',
//                   left: '15px',
//                   right: '15px',
//                   background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
//                   padding: '20px 16px',
//                 }}
//               >
//                 <Typography variant="body1" style={{ fontWeight: 500 }}>
//                   {currentAnnouncement.title}
//                 </Typography>
//                 <Typography variant="caption" style={{ opacity: 0.8 }}>
//                   {currentAnnouncement.date}
//                 </Typography>
//               </div>
//             </div>

//             {/* Pagination */}
//             <div
//               style={{
//                 padding: '12px 16px',
//                 backgroundColor: '#2a3042',
//                 display: 'flex',
//                 justifyContent: 'space-between',
//               }}
//             >
//               <div style={{ display: 'flex', gap: '8px' }}>
//                 {dummyAnnouncements.map((_, index) => (
//                   <div
//                     key={index}
//                     onClick={() => setCurrentAnnouncementIndex(index)}
//                     style={{
//                       width: '6px',
//                       height: '6px',
//                       borderRadius: '50%',
//                       backgroundColor:
//                         index === currentAnnouncementIndex ? '#3f51b5' : 'rgba(255,255,255,0.3)',
//                       cursor: 'pointer',
//                     }}
//                   />
//                 ))}
//               </div>

//               <div style={{ display: 'flex', gap: '8px' }}>
//                 <div
//                   onClick={handlePrevAnnouncement}
//                   style={{
//                     width: '28px',
//                     height: '28px',
//                     borderRadius: '50%',
//                     backgroundColor: 'rgba(255,255,255,0.1)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     cursor: 'pointer',
//                   }}
//                 >
//                   <ArrowBackIosNewIcon style={{ fontSize: '14px', color: 'white' }} />
//                 </div>

//                 <div
//                   onClick={handleNextAnnouncement}
//                   style={{
//                     width: '28px',
//                     height: '28px',
//                     borderRadius: '50%',
//                     backgroundColor: 'rgba(255,255,255,0.1)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     cursor: 'pointer',
//                   }}
//                 >
//                   <ArrowForwardIosIcon style={{ fontSize: '14px', color: 'white' }} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* ---------------- GRID CONTENT ---------------- */}
//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={4}>
//           <ProfileSummaryCard />
//         </Grid>

//         {user?.dynmis_empid && shouldShowPayslip() && (
//           <Grid item xs={12} sm={4}>
//             <PayslipCard />
//           </Grid>
//         )}

//         <Grid item xs={12} sm={4}>
//           <CalenderCard />
//         </Grid>

//         <Grid item xs={12} md={8}>
//           <HolidayCard />
//         </Grid>

//         <Grid item xs={12} md={4}>
//           <div style={{ marginTop: '24px' }}>
//             <img
//               src="/assets/images/311.jpg"
//               alt="Greeting"
//               style={{
//                 width: '100%',
//                 borderRadius: '15px',
//                 boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
//               }}
//             />
//             <Button
//               variant="contained"
//               color="primary"
//               startIcon={<NewReleasesIcon />}
//               onClick={handleOpenWhatsNew}
//               sx={{
//                 marginTop: '16px',
//                 backgroundColor: '#22cfe2',
//                 '&:hover': {
//                   backgroundColor: '#1db8c9',
//                 },
//                 borderRadius: '20px',
//                 textTransform: 'none',
//                 width: '100%',
//               }}
//             >
//               What's New
//             </Button>
//           </div>
//         </Grid>
//       </Grid>
//       {/* Floating What's New Button */}
//       <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 50 }}>
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<NewReleasesIcon />}
//           onClick={handleOpenWhatsNew}
//           sx={{
//             backgroundColor: '#22cfe2',
//             '&:hover': {
//               backgroundColor: '#1db8c9',
//             },
//             borderRadius: '20px',
//             textTransform: 'none',
//             boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//           }}
//         >
//           What's New
//         </Button>
//         <WhatsNew open={openWhatsNew} onClose={() => setOpenWhatsNew(false)} />
//       </div>
//     </div>
//   );
// }
"use client"

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import Changelog from "../components/Changelog"
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
  Box,
} from "@mui/material"

import ProfileSummaryCard from "./ProfileSummaryCard"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import commonConfig from "./commonConfig"
import { getAccessToken } from "app/utils/utils"
import WhatsNew from "./WhatsNew/WhatsNew"
import NewReleasesIcon from "@mui/icons-material/NewReleases"
import DownloadIcon from "@mui/icons-material/CloudDownload"
import FavoriteIcon from "@mui/icons-material/Favorite"
import GroupsIcon from "@mui/icons-material/Groups"
import AccountTreeIcon from "@mui/icons-material/AccountTree"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"

import CalenderCard from "./CalenderCard"
import HolidayCard from "./HolidayCard"

/* ---------------------- Styled Components --------------------------- */

const TopBanner = styled("div")(() => ({
  width: "100%",
  background: "#1a2038",
  borderRadius: "16px",
  padding: "40px",
  color: "white",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "30px",
}))

const RightButtons = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
}))

const BannerButton = styled(Button)(() => ({
  backgroundColor: "rgba(255, 255, 255, 0.12)",
  color: "white",
  padding: "10px 18px",
  justifyContent: "flex-start",
  borderRadius: "10px",
  fontWeight: 500,
  textTransform: "none",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
}))

const TagPill = styled("div")(() => ({
  display: "inline-block",
  padding: "6px 12px",
  backgroundColor: "rgba(255,255,255,0.2)",
  borderRadius: "6px",
  fontSize: "14px",
  marginTop: "6px",
}))

/* ---------------------- Payslip Card --------------------------- */

const PayslipWrapper = styled(Card)(() => ({
  marginTop: "20px",
  borderRadius: "15px",
  backgroundColor: "#1a2038",
  color: "white",
  display: "flex",
  flexDirection: "column",
  height: "90%",
  minHeight: "300px",
}))

const StyledIcon = styled(DownloadIcon)(() => ({
  color: "#FFA500",
}))

const PayslipCard = () => {
  const [months, setMonths] = useState([])
  const authToken = getAccessToken()
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    const loadMonths = async () => {
      try {
        const response = await axios(commonConfig.urls.getLetestPayslipMonths, {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        setMonths(response.data?.Response || [])
      } catch (err) {
        console.error("Error loading payslips", err)
      }
    }
    loadMonths()
  }, [])

  const downloadPayslip = async (slip) => {
    const [month, year] = slip.split(" ")
    try {
      const response = await axios.get(`${commonConfig.urls.generatePayslipPdf}/${month}/${year}`, {
        headers: { Authorization: `Bearer ${authToken}` },
        responseType: "blob",
      })

      const url = URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.download = `${slip}.pdf`
      link.click()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <PayslipWrapper>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2, height: "100%" }}>
        <Typography variant="h6" align="center" gutterBottom>
          Salary Slips
        </Typography>

        <Box sx={{ flexGrow: 1 }}>
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
        </Box>

        <Button
          variant="outlined"
          color="secondary"
          sx={{ mt: "auto", alignSelf: "center", px: 3 }}
          onClick={() => navigate("/salary/payslip/payslips")}
        >
          View All
        </Button>
      </CardContent>
    </PayslipWrapper>
  )
}

/* ---------------------- Thought of the Day Engine ---------------------- */

const dynproCategories = {
  motivation: ["motivation", "inspire", "dream", "hope", "courage", "mindset"],
  leadership: ["lead", "vision", "influence", "mentor", "guide", "decision"],
  teamwork: ["team", "together", "collaborate", "unity", "support"],
  discipline: ["discipline", "habit", "consistency", "routine", "focus"],
  innovation: ["technology", "innovation", "creative", "future", "change"],
  success: ["success", "achievement", "goal", "growth", "result"],
  integrity: ["integrity", "honest", "ethics", "truth", "values"],
}

function categorizeQuote(text) {
  const t = text.toLowerCase()
  for (const [category, keywords] of Object.entries(dynproCategories)) {
    if (keywords.some((k) => t.includes(k))) return category
  }
  return "general"
}

/* ---------------------- Dummy Data --------------------------- */

const dummyAnnouncements = [
  {
    id: 1,
    title: "Leadership Announcement - Madhup Agrawal",
    date: "Dec 17, 2025",
    description: "We are pleased to announce Madhup Agrawal as our new Chief Technology Officer.",
    image: "/assets/images/announcement-1.jpg",
  },
  {
    id: 2,
    title: "Office Timings Update",
    date: "Dec 20, 2025",
    description: "Starting next week, office timings will be 9:00 AM to 6:00 PM.",
    image: "/assets/images/announcement-2.jpg",
  },
  {
    id: 3,
    title: "New Year Celebrations",
    date: "Dec 30, 2025",
    description: "Join us for our annual New Year celebration on December 31st at 7:00 PM.",
    image: "/assets/images/announcement-3.jpg",
  },
]

const dummyEvents = [
  {
    id: 1,
    title: "Christmas Celebration & Secret Santa",
    date: "Dec 15, 2025",
    time: "All Day Event",
    description:
      "Join us for a joyful Christmas celebration including Secret Santa, theme days, and a festive Potluck.",
    location: "Office Premises",
    month: "DEC",
    day: "15",
  },
  {
    id: 2,
    title: "Year End Review Meeting",
    date: "Dec 28, 2025",
    time: "2:00 PM - 4:00 PM",
    description: "Annual year-end review meeting to discuss achievements and goals for the upcoming year.",
    location: "Conference Room A",
    month: "DEC",
    day: "28",
  },
]

/* ---------------------- Homepage Component ---------------------- */

export default function Homepage() {
  const navigate = useNavigate()
  const user = useSelector((state) => state.userDetails?.user)
  const { t } = useTranslation()

  const [roleId, setRoleId] = useState(null)
  const [thoughtOfTheDay, setThoughtOfTheDay] = useState("")
  const [thoughtCategory, setThoughtCategory] = useState("")
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0)
  const [openWhatsNew, setOpenWhatsNew] = useState(false)

  const currentAnnouncement = dummyAnnouncements[currentAnnouncementIndex]
  const fallbackThought = "Stay motivated and focused!"

  const handleNextAnnouncement = () => {
    setCurrentAnnouncementIndex((prev) => (prev === dummyAnnouncements.length - 1 ? 0 : prev + 1))
  }

  const handlePrevAnnouncement = () => {
    setCurrentAnnouncementIndex((prev) => (prev === 0 ? dummyAnnouncements.length - 1 : prev - 1))
  }

  const handleOpenWhatsNew = () => {
    setOpenWhatsNew(true)
    localStorage.setItem("lastSeenVersion", "1.0.0")
  }

  /* ---------------- Fetch Thought of the Day ---------------- */

  useEffect(() => {
    setRoleId(localStorage.getItem("roleId"))

    const fetchThought = async () => {
      try {
        const today = new Date().toISOString().split("T")[0]
        const storedThought = localStorage.getItem("thoughtOfTheDay")
        const storedDate = localStorage.getItem("thoughtDate")

        if (storedThought && storedDate === today) {
          const { quote, category } = JSON.parse(storedThought)
          setThoughtOfTheDay(quote)
          setThoughtCategory(category)
          return
        }

        const res = await fetch("https://api.api-ninjas.com/v2/quoteoftheday", {
          headers: {
            "X-Api-Key": "AH5iYd7mffjXrDxuGJy33w==eQppZs2XgSCmi6Op",
          },
        })

        const data = await res.json()
        const quote = data?.quote || fallbackThought
        const category = categorizeQuote(quote)

        const thoughtData = { quote, category }
        localStorage.setItem("thoughtOfTheDay", JSON.stringify(thoughtData))
        localStorage.setItem("thoughtDate", today)

        setThoughtOfTheDay(quote)
        setThoughtCategory(category)
      } catch (err) {
        console.error("Error loading Thought of the Day", err)
        setThoughtOfTheDay(fallbackThought)
        setThoughtCategory("motivation")
      }
    }

    fetchThought()
  }, [])

  const userName = user?.first_name || "User"
  const userRole = user?.dpro_designation_offered || user?.designation_name || "Employee"

  const greeting = (() => {
    const hr = new Date().getHours()
    if (hr < 12) return "Good Morning"
    if (hr < 18) return "Good Afternoon"
    return "Good Evening"
  })()

  const shouldShowPayslip = () => !["9", "10", "11"].includes(String(roleId))

  return (
    <div style={{ padding: "20px", backgroundColor: "#f5f5f5", position: "relative" }}>
      {/* Changelog Component */}
      <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}>
        <Changelog />
      </div>

      {/* ---------------- TOP BANNER ---------------- */}
      <TopBanner>
        <div>
          <img
            src="/assets/dynpro.png"
            alt="DynPro"
            style={{
              width: "160px",
              marginBottom: "10px",
              transform: "scale(1.5)",
            }}
          />

          <Typography variant="h4" fontWeight={700} style={{ marginBottom: "8px" }}>
            {greeting}, {userName}
          </Typography>

          <Typography variant="subtitle1" style={{ opacity: 0.9 }}>
            {userRole}
          </Typography>

          {/* Thought of the Day */}
          <TagPill style={{ maxWidth: "400px" }}>
            <div
              style={{
                fontSize: "1rem",
                marginBottom: "2px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>💭</span>
              <span>Thought of the Day</span>
            </div>

            <div style={{ fontStyle: "italic" }}>"{thoughtOfTheDay}"</div>

            <div
              style={{
                marginTop: "6px",
                opacity: 0.8,
                fontSize: "13px",
                textTransform: "capitalize",
              }}
            >
              Category: {thoughtCategory}
            </div>
          </TagPill>

          <Typography variant="h6" style={{ marginTop: "14px", fontWeight: 600 }}>
            Welcome to DynESS
          </Typography>
        </div>

        <RightButtons>
          <BannerButton startIcon={<FavoriteIcon />}>Our Culture</BannerButton>
          <BannerButton startIcon={<GroupsIcon />}>Our People</BannerButton>
          <BannerButton startIcon={<AccountTreeIcon />} onClick={() => navigate("/orgchart")}>
            Org Chart
          </BannerButton>
        </RightButtons>
      </TopBanner>

      {/* ---------------- EVENTS + ANNOUNCEMENTS ---------------- */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
        {/* EVENTS CARD */}
        <Card
          style={{
            backgroundColor: "#1a2038",
            color: "white",
            borderRadius: "12px",
            padding: "16px",
            flex: 1,
            maxHeight: "400px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <Typography variant="h6" style={{ fontWeight: 600 }}>
              Upcoming Events
            </Typography>
            <Typography variant="body2" style={{ color: "#3f51b5", cursor: "pointer" }}>
              See all
            </Typography>
          </div>

          {dummyEvents.map((event) => (
            <Card
              key={event.id}
              style={{
                backgroundColor: "#2a3042",
                borderRadius: "12px",
                padding: "16px",
                display: "flex",
                gap: "16px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  backgroundColor: event.id === 1 ? "#3f51b5" : "#4caf50",
                  borderRadius: "8px",
                  padding: "8px 10px",
                  minWidth: "70px",
                  textAlign: "center",
                }}
              >
                <Typography variant="h4" style={{ fontSize: "1rem", fontWeight: 700 }}>
                  {event.month}
                </Typography>
                <Typography variant="h3" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                  {event.day}
                </Typography>
              </div>

              <div style={{ flex: 1 }}>
                <Typography variant="subtitle1" style={{ fontWeight: 600, color: "white", marginBottom: "2px" }}>
                  {event.title}
                </Typography>

                <Typography variant="caption" style={{ color: "white", marginBottom: "4px", display: "block" }}>
                  {event.date} • {event.time}
                </Typography>

                <Typography
                  variant="body2"
                  style={{
                    color: "#b0b0b0",
                    opacity: 0.9,
                    marginBottom: "8px",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {event.description}
                </Typography>

                <div
                  style={{
                    display: "inline-block",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    padding: "2px 6px",
                    borderRadius: "3px",
                    fontSize: "0.7rem",
                    color: "white",
                  }}
                >
                  {event.location}
                </div>
              </div>
            </Card>
          ))}
        </Card>

        {/* ---------------- ANNOUNCEMENTS CARD ---------------- */}
        <Card
          style={{
            backgroundColor: "#1a2038",
            color: "white",
            borderRadius: "12px",
            padding: "16px",
            flex: 1,
            maxHeight: "400px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <Typography variant="h6" style={{ fontWeight: 600 }}>
              Announcements
            </Typography>
            <Typography variant="body2" style={{ color: "#3f51b5", cursor: "pointer" }}>
              See all
            </Typography>
          </div>

          <div
            style={{
              backgroundColor: "#2a3042",
              borderRadius: "12px",
              overflow: "hidden",
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "140px",
                position: "relative",
                backgroundColor: "#3a3f52",
              }}
            >
              <img
                src={currentAnnouncement.image || "/placeholder.svg"}
                alt="Announcement"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.8,
                }}
                onError={(e) => {
                  e.target.src =
                    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgNDAwIDIwMCI+PGNpcmNsZSByPSIyMDAiIGN4PSIyMDAiIGN5PSIxMDAiIGZpbGw9IiMzYTNmNTIiIC8+PC9zdmc+"
                }}
              />

              <div
                style={{
                  position: "absolute",
                  bottom: "15px",
                  left: "15px",
                  right: "15px",
                  background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                  padding: "20px 16px",
                }}
              >
                <Typography variant="body1" style={{ fontWeight: 500 }}>
                  {currentAnnouncement.title}
                </Typography>
                <Typography variant="caption" style={{ opacity: 0.8 }}>
                  {currentAnnouncement.date}
                </Typography>
              </div>
            </div>

            {/* Pagination */}
            <div
              style={{
                padding: "12px 16px",
                backgroundColor: "#2a3042",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", gap: "8px" }}>
                {dummyAnnouncements.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => setCurrentAnnouncementIndex(index)}
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: index === currentAnnouncementIndex ? "#3f51b5" : "rgba(255,255,255,0.3)",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <div
                  onClick={handlePrevAnnouncement}
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <ArrowBackIosNewIcon style={{ fontSize: "14px", color: "white" }} />
                </div>

                <div
                  onClick={handleNextAnnouncement}
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <ArrowForwardIosIcon style={{ fontSize: "14px", color: "white" }} />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* ---------------- GRID CONTENT ---------------- */}
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
          <div style={{ marginTop: "24px" }}>
            <img
              src="/assets/images/311.jpg"
              alt="Greeting"
              style={{
                width: "100%",
                borderRadius: "15px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            />
          </div>
        </Grid>
      </Grid>
      {/* Floating What's New Button */}
      <div style={{ position: "fixed", top: "20px", right: "20px", zIndex: 50 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<NewReleasesIcon />}
          onClick={handleOpenWhatsNew}
          sx={{
            backgroundColor: "#22cfe2",
            "&:hover": {
              backgroundColor: "#1db8c9",
            },
            borderRadius: "20px",
            textTransform: "none",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          What's New
        </Button>
        <WhatsNew open={openWhatsNew} onClose={() => setOpenWhatsNew(false)} />
      </div>
    </div>
  )
}