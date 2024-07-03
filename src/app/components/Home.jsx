import React from 'react';
import { Grid, Link, styled, Typography } from '@mui/material';

const MenuPathRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
  padding: '10px',
}));

const MenuPathName = styled('h4')(({ theme }) => ({
  margin: 0,
  fontSize: '16px',
  paddingBottom: '1px',
  verticalAlign: 'middle',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
}));

const FlexBox = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const JustifyBox = styled(FlexBox)(() => ({
  justifyContent: 'center',
}));

const Home = () => (
  <div style={{ backgroundColor: '#f5f8fa', height: '100%' }}>
    <MenuPathRoot>
      {/* <MenuPathName>The Analytics Tool Landing Page</MenuPathName> */}
    </MenuPathRoot>
    <Grid container spacing={1}>
      <Grid item sm={12}>
        {/* First row, two columns */}
        <Grid container spacing={1}>
          <Grid item sm={6} xs={12}>
            <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
              <Typography
                variant="h4"
                sx={{
                  color: '#25326d',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: '4rem',
                }}
              >
                Dynalytix
              </Typography>
            </JustifyBox>
          </Grid>

          <Grid item sm={7} style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '48px', margin: 0, marginRight: '6%' }}>
              <span style={{ color: '#00B0F0' }}>Welcome to </span>
              <span style={{ color: '#006FC0', fontWeight: 'lighter' }}>The Analytics Tool</span>
            </h1>
            {/* 55% width */}
            {/* Content for the right column */}
          </Grid>
        </Grid>
      </Grid>

      <Grid item sm={12}>
        {/* Second row, two columns */}
        <Grid container spacing={1}>
          <Grid item lg={8}>
            <img
              style={{
                objectFit: 'contain',
                width: '90%',
                paddingLeft: '10%',
              }}
              src={'/assets/images/landing-page/AnalyticsTool_2.png'}
              alt="Analytics Tool"
            />
            {/* 45% width */}
            {/* Content for the left column */}
          </Grid>
          <Grid item lg={4}>
            <div
              style={{
                width: '360px',
                fontSize: '36px',
                lineHeight: '38px',
                textAlign: 'right',
                color: '#0070C0',
              }}
            >
              <p style={{ margin: 0 }}>
                Data analytics is the foundation on which Dynalytix builds unique digital-to-human
                population health solutions.
              </p>
              <img
                style={{
                  width: '180px',
                }}
                src={'/assets/images/landing-page/Info_3.png'}
                alt="Info"
              />
            </div>
            {/* 55% width */}
            {/* Content for the right column */}
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        sm={12}
        color="#2383C8"
        style={{
          textAlign: 'center',
          fontWeight: 'normal',
          fontSize: '20px',
          marginLeft: '10%',
          marginRight: '10%',
        }}
      >
        <p>
          <div>
            The Analytics Tool is intended to provide a user-friendly way for you to view and
            explore your healthcare data. Dynalytix can provide training and additional resources to
            enhance your experience navigating The Analytics Tool.
          </div>
          <div>
            Dynalytix can also help to identify and implement customized population health management
            solutions.
          </div>
          <div>
            To learn more, please visit{' '}
            <Link color="#2C4B67" href="https://dynpro.com/" target="_blank" rel="noreferrer">
              dynpro.com
            </Link>
            .
          </div>
        </p>
        {/* Third row */}
        {/* 100% width */}
        {/* Content for the full-width row */}
      </Grid>
    </Grid>
  </div>
);

export default Home;
