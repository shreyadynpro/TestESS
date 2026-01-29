import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Grid,
  IconButton,
  LinearProgress,
  Tabs,
  Tab,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  School,
  PlayArrow,
  CheckCircle,
  Schedule,
  TrendingUp,
  Book,
  CardMembership,
  Work,
  Assignment,
  ArrowForward,
  Star,
  AccessTime,
  People,
  Language,
} from '@mui/icons-material';

const Learning = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Dummy data for learning content
  const trainingData = [
    {
      id: 1,
      title: 'React Advanced Patterns',
      type: 'course',
      status: 'in-progress',
      progress: 65,
      duration: '8 hours',
      instructor: 'John Smith',
      rating: 4.8,
      enrolled: 234,
      category: 'Technical',
      difficulty: 'Intermediate',
      image: '/assets/images/react-course.jpg',
      description: 'Master advanced React patterns and best practices for building scalable applications.',
    },
    {
      id: 2,
      title: 'Leadership Excellence Program',
      type: 'workshop',
      status: 'completed',
      progress: 100,
      duration: '2 days',
      instructor: 'Sarah Johnson',
      rating: 4.9,
      enrolled: 156,
      category: 'Leadership',
      difficulty: 'Advanced',
      image: '/assets/images/leadership-workshop.jpg',
      description: 'Develop essential leadership skills and management techniques.',
    },
    {
      id: 3,
      title: 'AWS Cloud Practitioner',
      type: 'certification',
      status: 'not-started',
      progress: 0,
      duration: '12 hours',
      instructor: 'Tech Academy',
      rating: 4.7,
      enrolled: 412,
      category: 'Cloud',
      difficulty: 'Beginner',
      image: '/assets/images/aws-cert.jpg',
      description: 'Prepare for AWS Cloud Practitioner certification exam.',
    },
    {
      id: 4,
      title: 'Agile Project Management',
      type: 'course',
      status: 'in-progress',
      progress: 30,
      duration: '6 hours',
      instructor: 'Mike Wilson',
      rating: 4.6,
      enrolled: 189,
      category: 'Management',
      difficulty: 'Intermediate',
      image: '/assets/images/agile-course.jpg',
      description: 'Learn Agile methodologies and project management frameworks.',
    },
    {
      id: 5,
      title: 'Communication Skills Workshop',
      type: 'workshop',
      status: 'upcoming',
      progress: 0,
      duration: '1 day',
      instructor: 'Emma Davis',
      rating: 4.8,
      enrolled: 67,
      category: 'Soft Skills',
      difficulty: 'Beginner',
      image: '/assets/images/communication-workshop.jpg',
      description: 'Enhance your communication and interpersonal skills.',
    },
    {
      id: 6,
      title: 'Python for Data Science',
      type: 'course',
      status: 'completed',
      progress: 100,
      duration: '10 hours',
      instructor: 'Dr. Robert Chen',
      rating: 4.9,
      enrolled: 328,
      category: 'Data Science',
      difficulty: 'Intermediate',
      image: '/assets/images/python-course.jpg',
      description: 'Master Python programming for data analysis and machine learning.',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#4caf50';
      case 'in-progress':
        return '#ff9800';
      case 'not-started':
        return '#9e9e9e';
      case 'upcoming':
        return '#2196f3';
      default:
        return '#9e9e9e';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'not-started':
        return 'Not Started';
      case 'upcoming':
        return 'Upcoming';
      default:
        return status;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'course':
        return <Book />;
      case 'workshop':
        return <Work />;
      case 'certification':
        return <CardMembership />;
      default:
        return <School />;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return '#4caf50';
      case 'Intermediate':
        return '#ff9800';
      case 'Advanced':
        return '#f44336';
      default:
        return '#9e9e9e';
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleContinueCourse = (course) => {
    // Show course details or navigate to course page
    console.log('Continuing course:', course.title);
    
    // You can implement different actions based on course status
    if (course.status === 'completed') {
      // Review the course
      console.log('Reviewing course:', course.title);
      // Navigate to course review page or show review modal
      alert(`Reviewing: ${course.title}\n\nThis would open the course review page.`);
    } else if (course.status === 'in-progress') {
      // Continue the course
      console.log('Continuing course:', course.title);
      // Navigate to course content or resume from last position
      alert(`Continuing: ${course.title}\n\nThis would resume the course from where you left off.\nProgress: ${course.progress}%`);
    } else {
      // Start the course
      console.log('Starting course:', course.title);
      // Navigate to course start page
      alert(`Starting: ${course.title}\n\nThis would open the course and begin your learning journey.`);
    }
    
    // Alternative: Navigate to a specific course page
    // window.location.href = `/learning/course/${course.id}`;
  };

  const filteredData = trainingData.filter((item) => {
    switch (activeTab) {
      case 0:
        return true; // All
      case 1:
        return item.status === 'in-progress';
      case 2:
        return item.status === 'completed';
      case 3:
        return item.status === 'upcoming' || item.status === 'not-started';
      default:
        return true;
    }
  });

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Learning & Training
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Enhance your skills with our comprehensive training programs
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={3}>
          <Card sx={{ backgroundColor: '#1a2038', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <School sx={{ fontSize: 40, mb: 1, color: '#64b5f6' }} />
              <Typography variant="h6" gutterBottom>
                {trainingData.length}
              </Typography>
              <Typography variant="body2">Total Courses</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ backgroundColor: '#1a2038', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <TrendingUp sx={{ fontSize: 40, mb: 1, color: '#81c784' }} />
              <Typography variant="h6" gutterBottom>
                {trainingData.filter(item => item.status === 'completed').length}
              </Typography>
              <Typography variant="body2">Completed</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ backgroundColor: '#1a2038', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <PlayArrow sx={{ fontSize: 40, mb: 1, color: '#ffb74d' }} />
              <Typography variant="h6" gutterBottom>
                {trainingData.filter(item => item.status === 'in-progress').length}
              </Typography>
              <Typography variant="body2">In Progress</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ backgroundColor: '#1a2038', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <CardMembership sx={{ fontSize: 40, mb: 1, color: '#e57373' }} />
              <Typography variant="h6" gutterBottom>
                {trainingData.filter(item => item.type === 'certification').length}
              </Typography>
              <Typography variant="body2">Certifications</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="All Courses" />
          <Tab label="In Progress" />
          <Tab label="Completed" />
          <Tab label="Available" />
        </Tabs>
      </Box>

      {/* Course Grid */}
      <Grid container spacing={3}>
        {filteredData.map((course) => (
          <Grid item xs={12} md={6} lg={4} key={course.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* Course Image */}
              <Box
                sx={{
                  height: 160,
                  backgroundColor: '#1a2038',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <School sx={{ fontSize: 60, color: 'rgba(255,255,255,0.3)' }} />
                <Chip
                  label={getStatusText(course.status)}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    backgroundColor: getStatusColor(course.status),
                    color: 'white',
                  }}
                />
              </Box>

              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Course Type and Title */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  {getTypeIcon(course.type)}
                  <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                    {course.type.charAt(0).toUpperCase() + course.type.slice(1)}
                  </Typography>
                </Box>

                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {course.title}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {course.description}
                </Typography>

                {/* Course Details */}
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AccessTime sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">{course.duration}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <People sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">{course.enrolled} enrolled</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Star sx={{ fontSize: 16, mr: 1, color: '#ffc107' }} />
                    <Typography variant="body2">{course.rating}</Typography>
                  </Box>
                </Box>

                {/* Progress Bar */}
                {course.status === 'in-progress' && (
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Progress</Typography>
                      <Typography variant="body2">{course.progress}%</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={course.progress}
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                )}

                {/* Tags */}
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  <Chip
                    label={course.category}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: '0.7rem' }}
                  />
                  <Chip
                    label={course.difficulty}
                    size="small"
                    sx={{
                      backgroundColor: getDifficultyColor(course.difficulty),
                      color: 'white',
                      fontSize: '0.7rem',
                    }}
                  />
                </Box>

                {/* Action Buttons */}
                <Box sx={{ mt: 'auto', display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    size="small"
                    fullWidth
                    startIcon={
                      course.status === 'completed' ? <CheckCircle /> : <PlayArrow />
                    }
                    onClick={() => handleContinueCourse(course)}
                    sx={{
                      backgroundColor: course.status === 'completed' ? '#4caf50' : '#0a2d82',
                      '&:hover': {
                        backgroundColor: course.status === 'completed' ? '#388e3c' : '#071f5c',
                      },
                    }}
                  >
                    {course.status === 'completed' ? 'Review' : 'Continue'}
                  </Button>
                  <IconButton 
                    size="small" 
                    sx={{ color: '#0a2d82' }}
                    onClick={() => handleContinueCourse(course)}
                  >
                    <ArrowForward />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            backgroundColor: 'white',
            borderRadius: 2,
          }}
        >
          <School sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No courses found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Check back later for new courses and training opportunities.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Learning;
