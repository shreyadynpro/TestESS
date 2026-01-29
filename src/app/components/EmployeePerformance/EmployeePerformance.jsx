import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Avatar,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Star,
  EmojiEvents,
  Assessment,
  Timeline,
  Person,
  Business,
  FilterList,
  Visibility,
  Edit,
  MoreVert,
  Add,
  Refresh,
} from '@mui/icons-material';

const EmployeePerformance = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('quarter');

  // Dummy data for employee performance
  const performanceData = [
    {
      id: 1,
      employeeName: 'John Smith',
      department: 'IT',
      role: 'Senior Developer',
      overallScore: 92,
      productivity: 88,
      quality: 95,
      teamwork: 90,
      innovation: 85,
      goalsCompleted: 8,
      goalsTotal: 10,
      trend: 'up',
      achievements: ['Top Performer', 'Innovation Award'],
      manager: 'David Wilson',
      lastReview: '2025-01-15',
    },
    {
      id: 2,
      employeeName: 'Sarah Johnson',
      department: 'HR',
      role: 'HR Manager',
      overallScore: 88,
      productivity: 85,
      quality: 90,
      teamwork: 92,
      innovation: 80,
      goalsCompleted: 7,
      goalsTotal: 8,
      trend: 'up',
      achievements: ['Team Player', 'Leadership Excellence'],
      manager: 'Lisa Anderson',
      lastReview: '2025-01-10',
    },
    {
      id: 3,
      employeeName: 'Michael Chen',
      department: 'Finance',
      role: 'Financial Analyst',
      overallScore: 78,
      productivity: 75,
      quality: 80,
      teamwork: 85,
      innovation: 70,
      goalsCompleted: 5,
      goalsTotal: 8,
      trend: 'down',
      achievements: ['Detail Oriented'],
      manager: 'Robert Brown',
      lastReview: '2025-01-20',
    },
    {
      id: 4,
      employeeName: 'Emily Davis',
      department: 'IT',
      role: 'UI/UX Designer',
      overallScore: 85,
      productivity: 82,
      quality: 88,
      teamwork: 87,
      innovation: 90,
      goalsCompleted: 6,
      goalsTotal: 7,
      trend: 'up',
      achievements: ['Creative Excellence', 'User Champion'],
      manager: 'David Wilson',
      lastReview: '2025-01-12',
    },
    {
      id: 5,
      employeeName: 'Alex Kumar',
      department: 'IT',
      role: 'DevOps Engineer',
      overallScore: 90,
      productivity: 92,
      quality: 88,
      teamwork: 85,
      innovation: 95,
      goalsCompleted: 9,
      goalsTotal: 10,
      trend: 'up',
      achievements: ['Technical Expert', 'Problem Solver'],
      manager: 'David Wilson',
      lastReview: '2025-01-18',
    },
  ];

  const departments = ['all', 'IT', 'HR', 'Finance', 'Marketing', 'Sales'];

  const getScoreColor = (score) => {
    if (score >= 90) return '#4caf50';
    if (score >= 80) return '#2196f3';
    if (score >= 70) return '#ff9800';
    return '#f44336';
  };

  const getScoreGrade = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Average';
    return 'Needs Improvement';
  };

  const averageScore = Math.round(performanceData.reduce((sum, emp) => sum + emp.overallScore, 0) / performanceData.length);
  const topPerformers = performanceData.filter(emp => emp.overallScore >= 90).length;
  const goalsCompletionRate = Math.round(performanceData.reduce((sum, emp) => sum + (emp.goalsCompleted / emp.goalsTotal * 100), 0) / performanceData.length);

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Employee Performance Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track and analyze employee performance metrics and goals
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={3}>
          <Card sx={{ backgroundColor: '#1a2038', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Assessment sx={{ fontSize: 40, mb: 1, color: '#64b5f6' }} />
              <Typography variant="h6" gutterBottom>
                {averageScore}
              </Typography>
              <Typography variant="body2">Average Score</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ backgroundColor: '#1a2038', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <EmojiEvents sx={{ fontSize: 40, mb: 1, color: '#81c784' }} />
              <Typography variant="h6" gutterBottom>
                {topPerformers}
              </Typography>
              <Typography variant="body2">Top Performers</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ backgroundColor: '#1a2038', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <TrendingUp sx={{ fontSize: 40, mb: 1, color: '#ffb74d' }} />
              <Typography variant="h6" gutterBottom>
                {goalsCompletionRate}%
              </Typography>
              <Typography variant="body2">Goals Completion</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ backgroundColor: '#1a2038', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Star sx={{ fontSize: 40, mb: 1, color: '#e57373' }} />
              <Typography variant="h6" gutterBottom>
                {performanceData.length}
              </Typography>
              <Typography variant="body2">Total Employees</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Department</InputLabel>
              <Select
                value={departmentFilter}
                label="Department"
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                {departments.map(dept => (
                  <MenuItem key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Time Period</InputLabel>
              <Select
                value={timeFilter}
                label="Time Period"
                onChange={(e) => setTimeFilter(e.target.value)}
              >
                <MenuItem value="month">This Month</MenuItem>
                <MenuItem value="quarter">This Quarter</MenuItem>
                <MenuItem value="year">This Year</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={() => {
                  setDepartmentFilter('all');
                  setTimeFilter('quarter');
                }}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                startIcon={<Add />}
                sx={{ backgroundColor: '#0a2d82', '&:hover': { backgroundColor: '#071f5c' } }}
              >
                Add Review
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label="Performance Overview" />
          <Tab label="Goals & Objectives" />
          <Tab label="Achievements" />
          <Tab label="Trends & Analytics" />
        </Tabs>
      </Box>

      {/* Performance Overview Tab */}
      {activeTab === 0 && (
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#1a2038' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Employee</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Department</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Overall Score</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Productivity</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Quality</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Teamwork</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Innovation</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Trend</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {performanceData.map((employee) => (
                  <TableRow key={employee.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ width: 32, height: 32 }}>
                          {employee.employeeName.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {employee.employeeName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {employee.role}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{employee.department}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" fontWeight="bold" color={getScoreColor(employee.overallScore)}>
                          {employee.overallScore}
                        </Typography>
                        <Chip
                          label={getScoreGrade(employee.overallScore)}
                          size="small"
                          sx={{
                            backgroundColor: getScoreColor(employee.overallScore),
                            color: 'white',
                            fontSize: '0.7rem',
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ width: 100 }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {employee.productivity}%
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={employee.productivity}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: getScoreColor(employee.productivity),
                            },
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ width: 100 }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {employee.quality}%
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={employee.quality}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: getScoreColor(employee.quality),
                            },
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ width: 100 }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {employee.teamwork}%
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={employee.teamwork}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: getScoreColor(employee.teamwork),
                            },
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ width: 100 }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {employee.innovation}%
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={employee.innovation}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: getScoreColor(employee.innovation),
                            },
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {employee.trend === 'up' ? (
                          <TrendingUp sx={{ color: '#4caf50', fontSize: 20 }} />
                        ) : (
                          <TrendingDown sx={{ color: '#f44336', fontSize: 20 }} />
                        )}
                        <Typography variant="body2">
                          {employee.trend === 'up' ? 'Improving' : 'Declining'}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" sx={{ color: '#0a2d82' }}>
                          <Visibility />
                        </IconButton>
                        <IconButton size="small" sx={{ color: '#0a2d82' }}>
                          <Edit />
                        </IconButton>
                        <IconButton size="small">
                          <MoreVert />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {/* Goals & Objectives Tab */}
      {activeTab === 1 && (
        <Grid container spacing={3}>
          {performanceData.map((employee) => (
            <Grid item xs={12} md={6} lg={4} key={employee.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar sx={{ width: 40, height: 40 }}>
                      {employee.employeeName.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        {employee.employeeName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {employee.role}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" fontWeight="medium">
                        Goals Progress
                      </Typography>
                      <Typography variant="body2">
                        {employee.goalsCompleted}/{employee.goalsTotal}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(employee.goalsCompleted / employee.goalsTotal) * 100}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: getScoreColor(employee.overallScore),
                        },
                      }}
                    />
                  </Box>

                  <Typography variant="body2" color="text.secondary">
                    Last Review: {employee.lastReview}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Achievements Tab */}
      {activeTab === 2 && (
        <Grid container spacing={3}>
          {performanceData.map((employee) => (
            <Grid item xs={12} md={6} lg={4} key={employee.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar sx={{ width: 40, height: 40 }}>
                      {employee.employeeName.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        {employee.employeeName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {employee.department}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {employee.achievements.map((achievement, index) => (
                      <Chip
                        key={index}
                        icon={<Star sx={{ fontSize: 16 }} />}
                        label={achievement}
                        size="small"
                        sx={{
                          backgroundColor: '#0a2d82',
                          color: 'white',
                          fontSize: '0.7rem',
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Trends & Analytics Tab */}
      {activeTab === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Department Performance
                </Typography>
                <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Chart visualization would go here
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Performance Trends
                </Typography>
                <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Trend chart would go here
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default EmployeePerformance;
