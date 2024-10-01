import { styled } from '@mui/system';
import { Box } from '@mui/material';
import img12 from 'app/components/AppLandingPage/assets/images/img12.jpg';

// FlexBox for alignment
export const FlexBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const JustifyBox = styled(FlexBox)(() => ({
  justifyContent: 'center',
}));

export const ContentBox = styled(Box)(() => ({
  height: '100%',
  padding: '37px',
  position: 'relative',
  background: 'rgba(0, 0, 0, 0.0)',
}));

export const JWTRoot = styled(JustifyBox)(() => ({
  minHeight: '91vh',
  margin: 0,
  backgroundColor: '#ffffff', // White background
  '& .card': {
    maxWidth: 500,
    minHeight: 530,
    margin: '10rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#eff0f3',
    color: 'black',
    boxShadow: '1px 5px 5px 5px #64645f',
  },
  '& .h1Heading': {
    fontSize: '30px',
    color: '#212e7c',
    fontFamily: 'serif',
    marginLeft: '11%',
    marginBottom: '0px',
    marginTop: '0px',
  },
  '@media (max-width: 768px)': {
    '& .card': {
      margin: '2rem',
    },
  },
  '@media (max-width: 480px)': {
    '& .card': {
      margin: '1rem',
    },
  },
}));

export const BackgroundImageBox = styled(Box)(() => ({
  backgroundImage: `url(${img12})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right center',
  marginTop: '1%',
  width: '100%',
  height: '88%',
  '@media (max-width: 768px)': {
    marginTop: '10%',
    height: '100%',
  },
}));
