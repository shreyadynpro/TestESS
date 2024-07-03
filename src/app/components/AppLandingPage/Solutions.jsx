import { Grid } from '@mui/material';
import React from 'react';

const solutions = [
  'Integrate your data resources',
  'Guide you in generating reports and preparing analysis',
  'Assist you during product or service launch',
  'Support your marketing, sales, and service activities',
  'Counsel you about process modeling to requirements analysis',
  'Upgrade your process environment',
];

const Solutions = () => {
  return (
    <section
      style={{
        paddingTop: '50px',
        paddingBottom: '95px',
        backgroundColor: '#2a346b',
      }}
    >
      <div
        style={{
          width: '100%',
          paddingRight: '15px',
          paddingLeft: '15px',
          marginRight: 'auto',
          marginLeft: 'auto',
        }}
      >
        <div style={{ justifyContent: 'center !important' }}>
          <div className="col-lg-6">
            <div style={{ textAlign: 'center' }}>
              <h4
                style={{
                  fontSize: '50px',
                  fontWeight: 600,
                  lineHeight: '55px',
                  color: '#ffffff',
                  marginBottom: 0,
                }}
                className="title1"
              >
                DynPro Solutions
              </h4>
              <div
                style={{
                  height: '5px',
                  width: '200px',
                  backgroundColor: '#ff9a00',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: '12px',
                  marginBottom: '25px',
                }}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            maxWidth: '1200px',
            width: '100%',
            marginLeft: '15%',
            marginRight: '10%',
          }}
        >
          {solutions.map((solution) => (
            <div
              style={{
                maxWidth: '244px',
                color: 'white',
                textAlign: 'center',
                borderRadius: '5px',
                padding: '25px',
                marginLeft: '117px',
                backgroundColor: '#6974b152',
                marginBottom: '18px',
                fontWeight: 500,
              }}
            >
              {solution}
            </div>
          ))}
        </div>
        {/* <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start">
          {solutions.map((solution) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={solution}
              style={{
                maxWidth: '244px',
                color: 'white',
                textAlign: 'center',
                borderRadius: '5px',
                padding: '25px',
                marginLeft: '117px',
                backgroundColor: '#6974b152',
                marginBottom: '18px',
                fontWeight: 500,
              }}
            >
              {solution}
            </Grid>
          ))}
        </Grid> */}
      </div>
    </section>
  );
};

export default Solutions;
