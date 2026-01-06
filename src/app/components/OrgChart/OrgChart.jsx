import React from 'react';
import { Box, Typography } from '@mui/material';

const colors = {
  teal: '#36B7B5',
  line: '#B0BEC5',
};

const Card = ({ title, subtitle }) => (
  <Box
    sx={{
      px: 2.5,
      py: 1.5,
      borderRadius: 1.5,
      minWidth: 220,
      textAlign: 'center',
      color: '#fff',
      backgroundColor: colors.teal,
      boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
      fontFamily: 'Inter, sans-serif',
    }}
  >
    <Typography fontWeight={700} fontSize={14}>
      {title}
    </Typography>
    <Typography fontSize={12} sx={{ opacity: 0.9 }}>
      {subtitle}
    </Typography>
  </Box>
);

const HorizontalLine = () => (
  <Box sx={{ height: 2, width: '100%', backgroundColor: colors.line }} />
);

export default function DynProOrgChart() {
  return (
    <Box sx={{ width: '100%', py: 6, background: '#fff' }}>
      <Typography align="center" color="warning.main" sx={{ mb: 3, fontWeight: 'bold' }}>
        This page is under development
      </Typography>
      {/* Title */}
      <Typography align="center" fontSize={26} fontWeight={800} letterSpacing={1} color="#1E88E5">
        DYNPRO
      </Typography>
      <Typography align="center" mb={5} color="#444">
        Extended Leadership Team
      </Typography>

      {/* Level 1 */}
      <Box display="flex" justifyContent="center" gap={6} mb={3}>
        <Card title="Dhruv Gupta" subtitle="Director" />
        <Card title="Sanjaya Gupta" subtitle="Director" />
      </Box>

      <HorizontalLine />

      {/* Level 2 */}
      <Box display="flex" justifyContent="center" gap={6} my={3}>
        <Card title="Susheel Patil" subtitle="VP – Operations" />
        <Card title="Vivek Gupta" subtitle="Director" />
      </Box>

      <HorizontalLine />

      {/* Level 3 */}
      <Box display="flex" justifyContent="center" gap={3} mt={3} flexWrap="wrap">
        <Card title="Prabhu Kumar" subtitle="VP Business Development (Global)" />
        <Card title="Rishikesh" subtitle="VP Business Development" />
        <Card title="Ashok Kumar" subtitle="AVP" />
        <Card title="Shefali Lall" subtitle="VP – HR" />
      </Box>
    </Box>
  );
}
