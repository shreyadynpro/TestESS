import { Grid, Icon, Typography } from '@mui/material';
import ServicesImg from './assets/images/services.png';

const analyticsItems = [
  { icon: 'dashboard', txt: 'Customizable Dashboard' },
  { icon: 'zoom_in', txt: 'Predictive Analytics' },
  { icon: 'summarize', txt: 'Evidence-Based Rules Report' },
  { icon: 'monitoring', txt: 'Enterprise Reporting' },
];

export default function AnalyticsToolInfo() {
  return (
    <section
      id="service"
      sx={{ py: 8 }}
      style={{
        width: '80%',
        textAlign: 'center',
        marginTop: '80px',
        marginBottom: '80px',
        marginLeft: '10%',
        marginRight: '10%',
      }}
    >
      <Grid container spacing={2}>
        {/* First Column */}
        <Grid item xs={12} md={6}>
          {/* First Row */}
          <Grid item xs={12}>
            <h4
              style={{ fontSize: '50px', fontWeight: '600', lineHeight: '55px', color: '#121212' }}
            >
              What We Do For You
            </h4>
          </Grid>
          {/* Second Row */}
          <Grid item xs={12}>
            <p
              style={{
                fontSize: '16px',
                lineHeight: '24px',
                color: '#6c6c6c',
                marginTop: '24px',
                fontWeight: '400',
                textAlign: 'justify',
              }}
            >
              The following are among the ways DynPro’s advanced analytics services can build your
              company intelligence
            </p>
          </Grid>
          {/* Third Row */}
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
                      color: '#121212',
                      alignSelf: 'center',
                    }}
                  >
                    {item?.txt}
                  </Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
        {/* Second Column */}
        <Grid item xs={12} md={6}>
          <img src={ServicesImg} alt="Services" style={{ width: '100%' }} />
        </Grid>
      </Grid>
    </section>
  );
}
