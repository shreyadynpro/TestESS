import React from 'react';
import { Box, Button, Card, CardContent, CardMedia } from '@mui/material';
import createTaskImage from 'app/components/AppLandingPage/assets/images/createtask.jpg';

const Tasks = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="200"
          image={createTaskImage}
          alt="Create Task"
        />
        <CardContent>
          <Button variant="contained" color="primary">
            Create Task
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Tasks;
