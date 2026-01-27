import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const ResourceAllocationSimple = () => {
  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Resource Allocation
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Manage and track employee resource allocations across projects
      </Typography>
      
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6">
            Resource Allocation Page
          </Typography>
          <Typography variant="body2">
            This is a test version to verify the page loads correctly.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ResourceAllocationSimple;
