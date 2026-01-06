import { Card, CardContent, Grid, Typography, Chip, Box, Paper, useTheme, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { Breadcrumb } from 'app/components';
import React from 'react';
import useSettings from 'app/hooks/useSettings';
import { themeShadows } from 'app/components/MatxTheme/themeColors';

const Container = styled('div')(({ theme }) => ({
  margin: '24px',
  [theme.breakpoints.down('sm')]: {
    margin: '16px',
  },
  '& .breadcrumb': {
    marginBottom: '24px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '16px',
    },
    '& a, & .MuiTypography-body1': {
      color: theme.palette.text.primary,
    },
  },
  backgroundColor: theme.palette.background.default,
  minHeight: 'calc(100vh - 75px)',
  padding: '24px',
  [theme.breakpoints.down('sm')]: {
    padding: '16px',
  },
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '& h4': {
    color: theme.palette.text.primary,
    fontWeight: 600,
    marginBottom: theme.spacing(2),
  },
  '& p': {
    color: theme.palette.text.secondary,
    fontSize: '1rem',
    lineHeight: 1.6,
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  transition: 'all 0.3s ease',
  boxShadow: theme.shadows[0],
  '&:hover': {
    boxShadow: themeShadows[3],
    transform: 'translateY(-4px)',
  },
  '& .MuiCardContent-root': {
    padding: '24px',
    '& h6': {
      color: theme.palette.text.primary,
      fontWeight: 600,
      marginBottom: '8px',
    },
    '& p': {
      color: theme.palette.text.secondary,
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
  },
}));

const IconBox = styled(Box)(({ theme }) => ({
  width: '48px',
  height: '48px',
  borderRadius: '8px',
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease',
  '& .material-icons': {
    fontSize: '2.0rem !important',
    width:'30px',
    height:'30px',
    color: theme.palette.getContrastText(
      theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light
    ),
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    '& .material-icons': {
      color: theme.palette.primary.contrastText,
    },
  },
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3, 2),
  textAlign: 'center',
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: themeShadows[3],
  },
  '& h5': {
    color: theme.palette.primary.main,
    fontWeight: 700,
    fontSize: '2rem',
    marginBottom: theme.spacing(1),
    lineHeight: 1.2,
  },
  '& p': {
    color: theme.palette.text.secondary,
    fontWeight: 500,
    fontSize: '0.875rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
}));

const CultureInitiativesPage = () => {
  const theme = useTheme();
  const { settings } = useSettings();
  const isDark = settings.themes[settings.activeTheme].palette.mode === 'dark';
  const [activeIndices, setActiveIndices] = useState({});

  // Initialize active indices for each event
  useEffect(() => {
    // Set initial active indices to 0 for all events
    const initialIndices = {};
    events.forEach((_, index) => {
      initialIndices[index] = 0;
    });
    setActiveIndices(initialIndices);

    // Set up interval for auto-rotation
    const interval = setInterval(() => {
      setActiveIndices(prevIndices => {
        const newIndices = { ...prevIndices };
        events.forEach((event, eventIndex) => {
          newIndices[eventIndex] = (prevIndices[eventIndex] + 1) % event.images.length;
        });
        return newIndices;
      });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle navigation between images
  const navigateImage = (eventIndex, direction) => {
    setActiveIndices(prevIndices => {
      const currentIndex = prevIndices[eventIndex] || 0;
      const event = events[eventIndex];
      const totalImages = event.images.length;
      let newIndex;
      
      if (direction === 'prev') {
        newIndex = (currentIndex - 1 + totalImages) % totalImages;
      } else {
        newIndex = (currentIndex + 1) % totalImages;
      }
      
      return {
        ...prevIndices,
        [eventIndex]: newIndex
      };
    });
  };

  const events = [
    {
      title: 'Christmas Celebration',
      description:
        'Join us for our annual Christmas celebration filled with joy, gifts, and festive cheer! A time for team bonding and creating wonderful memories together.',
      icon: 'celebration',
      tag: 'Festive',
      images: [
         '/assets/Christmas/cri1.png',
        '/assets/Christmas/cri.jpeg',
        '/assets/Christmas/9.jpeg',
        '/assets/Christmas/cri (3).jpeg',
        '/assets/Christmas/cri (4).jpeg',
        '/assets/Christmas/cri (5).jpeg',
        '/assets/Christmas/cri (6).jpeg',
        '/assets/Christmas/cristmas.jpeg',
        '/assets/Christmas/cristmas (2).jpeg',
        '/assets/Christmas/cristmas (3).jpeg',
        '/assets/Christmas/cristmas (4).jpeg',
        '/assets/Christmas/cristmas (5).jpeg',
        '/assets/Christmas/cristmas (6).jpeg',
        '/assets/Christmas/cristmas (7).jpeg',
        '/assets/Christmas/cristmas (8).jpeg'
      ]
    },
    {
      title: 'Potluck Party',
      description:
        'Our potluck events where team members bring dishes from their culture, celebrating diversity and enjoying delicious food together.',
      icon: 'restaurant',
      tag: 'Food & Fun',
      images: [
         '/assets/team-spirit/pot1.png',
        '/assets/team-spirit/pot6.jpeg',
        '/assets/team-spirit/pot5.jpeg',
        '/assets/team-spirit/pot4.jpeg',
        '/assets/team-spirit/pot7.jpg',
        '/assets/team-spirit/pot10.jpeg',
        '/assets/team-spirit/pot12.jpeg',
        '/assets/team-spirit/pot16.jpeg',
        '/assets/team-spirit/pot17.jpeg',
        '/assets/team-spirit/pot23.jpeg',
        '/assets/team-spirit/pot25.jpeg',
      ]
    },
    {
      title: 'Festival Celebrations',
      description:
        'Celebrating various cultural festivals throughout the year, embracing our diverse workforce and learning about different traditions and customs.',
      icon: 'festival',
      tag: 'Cultural',
      images: [
        '/assets/festival/fest1.png',
        '/assets/festival/ganapa.jpg'
      ]
    }
  ];

  
  const stats = [
    { label: 'Global Practitioners', value: '1500+' },
    { label: 'Years of Excellence', value: `29+ Years` },
    { label: 'Countries Served', value: 'US, UK, India, Morocco' },
    { label: 'Enterprise Clients', value: '11+' },
  ];

  return (
    <>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Cultural Initiatives' }]} />
      </Box>

      <Container>
        <HeaderSection>
          <Typography variant="h4" component="h1">
            Cultural Initiatives
          </Typography>
          <Typography variant="body1">
            DynPro is a global leader in IT Solutions & Services with a workforce of more than 1200
            practitioners across North America, EMEAS, and Asia. Our Culture Initiatives promote
            alignment with our mission, celebrate achievements, and reinforce DynPro’s identity as a
            trusted advisor to clients, consultants, and employees.
          </Typography>
        </HeaderSection>

        {/* Quick Stats */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {stats.map((stat, index) => (
            <Grid item xs={6} sm={6} md={3} key={index}>
              <StatCard elevation={0}>
                <Typography variant="h5" component="div">
                  {stat.value}
                </Typography>
                <Typography variant="body2" component="p">
                  {stat.label}
                </Typography>
              </StatCard>
            </Grid>
          ))}
        </Grid>

        {/* Section Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 4,
            color: 'text.primary',
            position: 'relative',
            paddingBottom: '8px',
            '&:after': {
              content: '""',
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '40px',
              height: '3px',
              backgroundColor: 'primary.main',
              borderRadius: '2px',
            },
          }}
        >
          Our Gallery
        </Typography>

        {/* Events Grid */}
        <Grid container spacing={4}>
          {events.map((event, index) => (
            <Grid item xs={12} sm={6} lg={4} key={index}>
              <StyledCard elevation={0}>
                <Box 
                  sx={{ 
                    position: 'relative', 
                    height: { xs: '250px', sm: '300px', md: '350px' },
                    overflow: 'hidden',
                    '&:hover .nav-arrow': {
                      opacity: 1,
                      transform: 'translateX(0)'
                    },
                    '&:hover .image-indicators': {
                      opacity: 1
                    }
                  }}
                >
                  {event.images.map((img, imgIndex) => {
                    const isActive = activeIndices[index] === imgIndex;
                    return (
                      <Box
                        key={imgIndex}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          opacity: isActive ? 1 : 0,
                          transition: 'opacity 0.5s ease-in-out',
                          '&:hover img': {
                            transform: 'scale(1.1)',
                          },
                        }}
                      >
                        <img
                          src={img}
                          alt={`${event.title} ${imgIndex + 1}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.5s ease',
                          }}
                        />
                      </Box>
                    );
                  })}
                  
                  {/* Navigation Arrows */}
                  <Box 
                    className="nav-arrow"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateImage(index, 'prev');
                    }}
                    sx={{
                      position: 'absolute',
                      left: 10,
                      top: '50%',
                      transform: 'translateX(-10px)',
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      opacity: 0,
                      transition: 'all 0.3s ease',
                      zIndex: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)'
                      }
                    }}
                  >
                    <span className="material-icons" style={{ color: '#333' }}>chevron_left</span>
                  </Box>
                  
                  <Box 
                    className="nav-arrow"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateImage(index, 'next');
                    }}
                    sx={{
                      position: 'absolute',
                      right: 10,
                      top: '50%',
                      transform: 'translateX(10px)',
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      opacity: 0,
                      transition: 'all 0.3s ease',
                      zIndex: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)'
                      }
                    }}
                  >
                    <span className="material-icons" style={{ color: '#333' }}>chevron_right</span>
                  </Box>
                  
                  {/* Image Indicators */}
                  <Box 
                    className="image-indicators"
                    sx={{
                      position: 'absolute',
                      bottom: '10px',
                      left: 0,
                      right: 0,
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '6px',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      zIndex: 2
                    }}
                  >
                    {event.images.map((_, idx) => (
                      <Box
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveIndices(prev => ({
                            ...prev,
                            [index]: idx
                          }));
                        }}
                        sx={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor: activeIndices[index] === idx ? 'white' : 'rgba(255, 255, 255, 0.5)',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: 'white',
                            transform: 'scale(1.2)'
                          }
                        }}
                      />
                    ))}
                  </Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      p: 2,
                    }}
                  >
                    <Chip
                      label={event.tag}
                      size="small"
                      sx={{
                        mb: 1,
                        alignSelf: 'flex-start',
                        backgroundColor: 'primary.main',
                        color: 'white',
                        fontWeight: 500,
                        height: '28px',
                        '& .MuiChip-label': { 
                          fontSize: '0.9rem',
                          padding: '0 8px',
                          fontWeight: 600
                        }
                      }}
                    />
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                      {event.title}
                    </Typography>
                  </Box>
                </Box>
                <CardContent sx={{ p: '8px 12px 8px', '&:last-child': { paddingBottom: '8px' } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: '-2px' }}>
                    <IconBox sx={{ minWidth: '20px', '& .material-icons': { fontSize: '0.9rem' } }}>
                      <span className="material-icons">
                        {event.icon}
                      </span>
                    </IconBox>
                    <Typography variant="subtitle2" sx={{ 
                      ml: 0.5, 
                      fontSize: '0.95rem', 
                      fontWeight: 500, 
                      lineHeight: 1,
                      color: 'text.primary',
                      transform: 'translateY(1px)'
                    }}>
                      {event.tag}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ 
                    fontSize: '0.85rem', 
                    lineHeight: 1.2, 
                    mt: 0,
                    pt: 0,
                    display: 'block',
                    transform: 'translateY(-2px)'
                  }}>
                    {event.description}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        {/* Vision Section */}
        <Paper
          elevation={0}
          sx={{
            mt: 6,
            p: { xs: 2, sm: 3, md: 4 },
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: 'background.paper',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: themeShadows[2],
            },
            width: '100%',
            maxWidth: '1200px',
            mx: 'auto',
          }}
        >
          <Box sx={{ py: 6, backgroundColor: '#f8f9fa' }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <img
                    src="/assets/OIP.jpg"
                    alt="Our Vision"
                    style={{
                      width: '300px',
                      height: '300px',
                      borderRadius: '0%',
                      objectFit: 'cover',
                      border: '10px solid white',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6} sx={{ pl: { md: 4 } }}>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    fontWeight: 700,
                    color: '#2c3e50',
                    mb: 2,
                    position: 'relative',
                    display: 'inline-block',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      bottom: '-10px',
                      left: 0,
                      width: '60px',
                      height: '4px',
                      backgroundColor: '#ff6b6b',
                      borderRadius: '2px',
                    },
                  }}
                >
                  Vision
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#555',
                    lineHeight: 1.8,
                    fontSize: '1.1rem',
                    mt: 4,
                    mb: 3,
                  }}
                >
                  <p>
                    We strive to be a worldwide leader in{' '}
                    <strong>Information Technology Solutions</strong>. Because DynPro is recognized
                    for our expertise in select technologies, we creatively adapt and apply those
                    technologies to solve our clients’ business and IT challenges.
                  </p>
                  <p>
                    As trusted advisors, we help guide and provide solutions for our clients.
                    Because of us, they can navigate the marketplace, advances in technology, and
                    the dynamically changing technology workforce. As corporate citizens, we are
                    actively engaged and making an impact in our communities as individuals, teams,
                    and our company.
                  </p>
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Typography
              variant="body1"
              component="div"
              sx={{
                color: 'text.primary',
                lineHeight: 1.8,
                fontSize: '1rem',
                '& strong': {
                  color: 'text.primary',
                  fontWeight: 500,
                },
                '& p': {
                  margin: 0,
                  padding: 0,
                  '&:not(:last-child)': {
                    mb: 2,
                  },
                },
              }}
            ></Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default CultureInitiativesPage;