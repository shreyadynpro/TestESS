import React from 'react';
import { Icon, Grid, Typography } from '@mui/material';
import CallToAction from './assets/images/14.jpg';

const analyticsItems = [
  { icon: 'dashboard', txt: 'Advanced Analytics' },
  { icon: 'help', txt: 'Enterprise Solutions' },
  { icon: 'group', txt: 'Data Integration' },
  { icon: 'zoom_in', txt: 'Robotic Process Automation' },
  { icon: 'summarize', txt: 'Cybersecurity' },
];

const LearnMore = () => {
  return (
    <Grid container sx={{ backgroundColor: '#0067f4', textAlign: 'center' }}>
      <Grid item sm={12} md={6}>
        <img
          style={{
            maxWidth: '100%',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
          }}
          src={CallToAction}
          alt="call-to-action"
        />
      </Grid>
      <Grid
        item
        sm={12}
        md={6}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}
      >
        <div>
          <h1 style={{ margin: '0 auto' }}>Over 25 Years of Service Excellence</h1>
          <h2>1200+ Workforce Around the Globe</h2>
          <Grid item xs={12} container spacing={2}>
            {analyticsItems.map((item, index) => (
              <Grid key={index} item xs={12} md={6}>
                <div style={{ padding: '1rem', display: 'flex' }}>
                  <span>
                    <Icon style={{ marginTop: '5px', marginRight: '10px' }}>{item?.icon}</Icon>
                  </span>
                  <Typography
                    variant="h4"
                    component="h4"
                    style={{
                      textAlign: 'left',
                      fontSize: '24px',
                      fontWeight: 500,
                      lineHeight: '30px',
                      alignSelf: 'center',
                    }}
                  >
                    {item?.txt}
                  </Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

export default LearnMore;
