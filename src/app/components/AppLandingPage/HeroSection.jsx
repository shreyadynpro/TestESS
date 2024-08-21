import { useEffect, useState } from 'react';

import { Box, Button, CardMedia, Container, Grid, Paper, Typography, Zoom } from '@mui/material';
import BGVideo from './assets/images/bgvideo3.mp4';

export default function HeroSection() {
  const [shouldShow, setShouldShow] = useState(false);
  useEffect(() => setShouldShow(true), []);
  return (
    <Paper
      sx={{
        height: '100vh',
        position: 'relative',
      }}
      id="about"
    >
      <div
        style={{
          left: 0,
          top: 0,
          /* 
          'linear-gradient(rgba(232, 237, 255, 0.9), rgba(239, 254, 255, 0.9) 50%, rgba(254, 255, 244, 0.3) 68%, rgba(255, 255, 255, 0.12))',
          */
          backgroundImage:
            '          linear-gradient(rgba(232, 237, 255, 0), rgba(239, 254, 255, 0.3) 100%, rgba(254, 255, 244, 1) 0%, rgba(255, 255, 255, 0))',
          position: 'absolute',
          height: '100%',
          width: '100%',
          zIndex: 2,
        }}
      ></div>
      <CardMedia
        style={{
          objectFit: 'cover',
          position: 'absolute',
          height: '100%',
          width: '100%',
          zIndex: 1,
        }}
        component="video"
        image={BGVideo}
        autoPlay
        muted
        loop
      />
      <Container
        sx={{
          height: '100%',
        }}
        maxWidth="md"
      >
        <Grid
          sx={{
            height: '100%',
            zIndex: 100,
            position: 'relative',
            paddingTop: '30vh',
            color: 'white',
          }}
          container
          justifyContent="space-between"
        >
          <Zoom in={shouldShow}>
            <Grid item sm={12} textAlign={'center'}>
              <Typography component="h1" variant="h3">
              EMPOWERING PEOPLE, ELEVATING PERFORMANCE!
                <Typography variant="h5">
                Streamlining people management to boost employee engagement and productivity.{' '}
                </Typography>
              </Typography>
              <Box my={2}>
                <Button
                  href="https://allhealthchoice.com/"
                  variant="contained"
                  style={{
                    letterSpacing: '0.00938em',
                    fontFamily: "'Poppins', sans-serif",
                    fontStyle: 'normal',
                    listStyleType: 'none',
                    margin: '0',
                    boxSizing: 'border-box',
                    textDecoration: 'none',
                    display: 'inline-block',
                    fontWeight: 700,
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    verticalAlign: 'middle',
                    userSelect: 'none',
                    padding: '0 32px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    zIndex: 5,
                    transition: 'all 0.4s ease-out 0s',
                    position: 'relative',
                    textTransform: 'uppercase',
                    borderRadius: '50px',
                    overflow: 'hidden',
                    boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
                    border: '0',
                    lineHeight: '50px',
                    color: '#fff',
                  }}
                >
                  Get in Touch!
                </Button>
              </Box>
            </Grid>
          </Zoom>
        </Grid>
      </Container>
    </Paper>
  );
}
