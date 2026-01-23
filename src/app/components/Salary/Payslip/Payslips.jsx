import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Select,
  MenuItem,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const SalarySlips = () => {
  const [selectedMonth, setSelectedMonth] = useState('January 2026');

  // Empty list = No payslip available
  const payslipData = [];

  const allMonths = [
    'January 2026',
    'December 2025',
    'November 2025',
    'October 2025',
    'September 2025',
    'August 2025',
    'July 2025',
    'June 2025',
    'May 2025',
    'April 2025',
    'March 2025',
    'February 2025',
  ];

  const previousMonths = [
    'December 2025',
    'November 2025',
    'October 2025',
  ];

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Salary Slips
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Select
            size="small"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {allMonths.map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>

          <IconButton sx={{ color: '#0a2d82' }}>
            <DownloadIcon />
          </IconButton>
          <IconButton sx={{ color: '#0a2d82' }}>
            <CloudDownloadIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Empty State */}
      {payslipData.length === 0 && (
        <>
          <Card
            sx={{
              minHeight: 420,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              mb: 4,
              p: 4,
              background: 'linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              borderRadius: 3,
            }}
          >
            {/* Illustration */}
            <Box
              component="img"
              src="/assets/images/no-payslip.png"
              alt="No Payslip Available"
              sx={{ width: 260, mb: 3 }}
            />

            <Typography variant="h6" fontWeight="bold" gutterBottom>
              No Payslip Available
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ maxWidth: 420, mb: 3 }}
            >
              Your salary slip for the selected month has not been generated yet.
            </Typography>

            <Box
              sx={{
                px: 4,
                py: 1.2,
                backgroundColor: '#0a2d82',
                color: '#fff',
                borderRadius: 2,
                cursor: 'pointer',
                fontWeight: 500,
                '&:hover': { backgroundColor: '#071f5c' },
              }}
              onClick={() => setSelectedMonth('')}
            >
              Try another month
            </Box>
          </Card>

          {/* Previous Months */}
          <Card sx={{ maxWidth: 600 }}>
            <List>
              {previousMonths.map((month) => (
                <ListItem
                  key={month}
                  sx={{
                    cursor: 'pointer',
                    borderBottom: '1px solid #eee',
                    '&:hover': { backgroundColor: '#f8f9fa' },
                  }}
                >
                  <ListItemText primary={month} />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: '#0a2d82', fontWeight: 500 }}
                    >
                    </Typography>
                    <IconButton size="small" sx={{ color: '#0a2d82' }}>
                      <ArrowForwardIcon />
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Card>
        </>
      )}
    </Box>
  );
};

export default SalarySlips;
