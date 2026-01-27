import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Tabs,
  Tab,
  Avatar,
  LinearProgress,
} from '@mui/material';
import {
  Search,
  FilterList,
  Visibility,
  Edit,
  MoreVert,
  Assignment,
  Business,
  Person,
  DateRange,
  CheckCircle,
  Schedule,
  Pending,
  TrendingUp,
  Add,
  Refresh,
} from '@mui/icons-material';

const InternalTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [activeTab, setActiveTab] = useState(0);
  const [selectedTask, setSelectedTask] = useState(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [statusMenuAnchor, setStatusMenuAnchor] = useState(null);
  const [selectedTaskForStatus, setSelectedTaskForStatus] = useState(null);
  const [newTaskDialogOpen, setNewTaskDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    taskName: '',
    department: '',
    category: '',
    assignedBy: '',
    startDate: '',
    endDate: '',
    status: 'pending',
    priority: 'medium',
    description: '',
    assignee: '',
    estimatedHours: '',
  });

  // Dummy data for internal tasks
  const dummyTasks = [
    {
      id: 1,
      taskName: 'Update Employee Handbook',
      department: 'HR',
      category: 'Policy Update',
      assignedBy: 'Sarah Johnson',
      startDate: '2025-01-15',
      endDate: '2025-01-30',
      status: 'in-progress',
      priority: 'high',
      progress: 65,
      description: 'Review and update the employee handbook with new company policies and procedures.',
      assignee: 'John Smith',
      estimatedHours: 20,
      actualHours: 13,
    },
    {
      id: 2,
      taskName: 'Q1 Financial Report Preparation',
      department: 'Finance',
      category: 'Reporting',
      assignedBy: 'Michael Chen',
      startDate: '2025-01-10',
      endDate: '2025-01-25',
      status: 'completed',
      priority: 'high',
      progress: 100,
      description: 'Prepare quarterly financial reports for board meeting.',
      assignee: 'Emily Davis',
      estimatedHours: 40,
      actualHours: 38,
    },
    {
      id: 3,
      taskName: 'Office Network Security Audit',
      department: 'IT',
      category: 'Security',
      assignedBy: 'David Wilson',
      startDate: '2025-01-20',
      endDate: '2025-02-05',
      status: 'in-progress',
      priority: 'critical',
      progress: 40,
      description: 'Conduct comprehensive security audit of office network infrastructure.',
      assignee: 'Alex Kumar',
      estimatedHours: 60,
      actualHours: 24,
    },
    {
      id: 4,
      taskName: 'Employee Training Program Development',
      department: 'HR',
      category: 'Training',
      assignedBy: 'Lisa Anderson',
      startDate: '2025-02-01',
      endDate: '2025-02-28',
      status: 'pending',
      priority: 'medium',
      progress: 0,
      description: 'Develop comprehensive training program for new employees.',
      assignee: 'Rachel Green',
      estimatedHours: 35,
      actualHours: 0,
    },
    {
      id: 5,
      taskName: 'Marketing Campaign Planning',
      department: 'Marketing',
      category: 'Campaign',
      assignedBy: 'Tom Martinez',
      startDate: '2025-01-18',
      endDate: '2025-02-15',
      status: 'in-progress',
      priority: 'medium',
      progress: 25,
      description: 'Plan and execute Q1 marketing campaign for new product launch.',
      assignee: 'Jessica Lee',
      estimatedHours: 45,
      actualHours: 11,
    },
    {
      id: 6,
      taskName: 'Database Performance Optimization',
      department: 'IT',
      category: 'Infrastructure',
      assignedBy: 'Robert Brown',
      startDate: '2025-01-12',
      endDate: '2025-01-22',
      status: 'completed',
      priority: 'high',
      progress: 100,
      description: 'Optimize database performance for improved application response time.',
      assignee: 'Kevin Zhang',
      estimatedHours: 30,
      actualHours: 28,
    },
    {
      id: 7,
      taskName: 'Office Supplies Inventory',
      department: 'Admin',
      category: 'Operations',
      assignedBy: 'Jennifer White',
      startDate: '2025-01-25',
      endDate: '2025-01-28',
      status: 'pending',
      priority: 'low',
      progress: 0,
      description: 'Conduct monthly inventory check and order office supplies.',
      assignee: 'Mark Johnson',
      estimatedHours: 8,
      actualHours: 0,
    },
    {
      id: 8,
      taskName: 'Client Feedback Analysis',
      department: 'Sales',
      category: 'Analysis',
      assignedBy: 'Amanda Foster',
      startDate: '2025-01-08',
      endDate: '2025-01-20',
      status: 'completed',
      priority: 'medium',
      progress: 100,
      description: 'Analyze client feedback from Q4 2024 and prepare improvement recommendations.',
      assignee: 'Brian Taylor',
      estimatedHours: 25,
      actualHours: 22,
    },
  ];

  useEffect(() => {
    setTasks(dummyTasks);
    setFilteredTasks(dummyTasks);
  }, []);

  useEffect(() => {
    let filtered = tasks;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.taskName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.assignedBy.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(task => task.status === statusFilter);
    }

    // Apply department filter
    if (departmentFilter !== 'all') {
      filtered = filtered.filter(task => task.department === departmentFilter);
    }

    // Apply tab filter
    if (activeTab === 1) {
      filtered = filtered.filter(task => task.status === 'pending');
    } else if (activeTab === 2) {
      filtered = filtered.filter(task => task.status === 'in-progress');
    } else if (activeTab === 3) {
      filtered = filtered.filter(task => task.status === 'completed');
    }

    setFilteredTasks(filtered);
  }, [tasks, searchTerm, statusFilter, departmentFilter, activeTab]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#4caf50';
      case 'in-progress':
        return '#ff9800';
      case 'pending':
        return '#9e9e9e';
      default:
        return '#9e9e9e';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle />;
      case 'in-progress':
        return <Schedule />;
      case 'pending':
        return <Pending />;
      default:
        return <Pending />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return '#f44336';
      case 'high':
        return '#ff9800';
      case 'medium':
        return '#2196f3';
      case 'low':
        return '#4caf50';
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
      case 'pending':
        return 'Pending';
      default:
        return status;
    }
  };

  const handleViewDetails = (task) => {
    setSelectedTask(task);
    setDetailsDialogOpen(true);
  };

  const handleStatusMenuOpen = (event, task) => {
    setStatusMenuAnchor(event.currentTarget);
    setSelectedTaskForStatus(task);
  };

  const handleStatusMenuClose = () => {
    setStatusMenuAnchor(null);
    setSelectedTaskForStatus(null);
  };

  const handleStatusUpdate = (newStatus) => {
    if (selectedTaskForStatus) {
      setTasks(tasks.map(task =>
        task.id === selectedTaskForStatus.id
          ? { ...task, status: newStatus, progress: newStatus === 'completed' ? 100 : task.progress }
          : task
      ));
    }
    handleStatusMenuClose();
  };

  const departments = ['all', ...new Set(tasks.map(task => task.department))];

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Internal Tasks
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage and track internal company tasks and projects
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={3}>
          <Card sx={{ backgroundColor: '#1a2038', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Assignment sx={{ fontSize: 40, mb: 1, color: '#64b5f6' }} />
              <Typography variant="h6" gutterBottom>
                {tasks.length}
              </Typography>
              <Typography variant="body2">Total Tasks</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ backgroundColor: '#1a2038', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Pending sx={{ fontSize: 40, mb: 1, color: '#ffb74d' }} />
              <Typography variant="h6" gutterBottom>
                {tasks.filter(task => task.status === 'pending').length}
              </Typography>
              <Typography variant="body2">Pending</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ backgroundColor: '#1a2038', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Schedule sx={{ fontSize: 40, mb: 1, color: '#81c784' }} />
              <Typography variant="h6" gutterBottom>
                {tasks.filter(task => task.status === 'in-progress').length}
              </Typography>
              <Typography variant="body2">In Progress</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ backgroundColor: '#1a2038', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <CheckCircle sx={{ fontSize: 40, mb: 1, color: '#e57373' }} />
              <Typography variant="h6" gutterBottom>
                {tasks.filter(task => task.status === 'completed').length}
              </Typography>
              <Typography variant="body2">Completed</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters and Search */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
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
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                    setDepartmentFilter('all');
                    setActiveTab(0);
                  }}
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  sx={{ backgroundColor: '#0a2d82', '&:hover': { backgroundColor: '#071f5c' } }}
                >
                  New Task
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label="All Tasks" />
          <Tab label="Pending" />
          <Tab label="In Progress" />
          <Tab label="Completed" />
        </Tabs>
      </Box>

      {/* Tasks Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1a2038' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Task Name</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Department / Category</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Assigned By</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Start Date</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>End Date</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Progress</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.id} hover>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {task.taskName}
                      </Typography>
                      <Chip
                        label={task.priority}
                        size="small"
                        sx={{
                          backgroundColor: getPriorityColor(task.priority),
                          color: 'white',
                          fontSize: '0.7rem',
                          mt: 0.5,
                        }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2">{task.department}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {task.category}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 24, height: 24, fontSize: '0.8rem' }}>
                        {task.assignedBy.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <Typography variant="body2">{task.assignedBy}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{task.startDate}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{task.endDate}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getStatusIcon(task.status)}
                      <Chip
                        label={getStatusText(task.status)}
                        size="small"
                        sx={{
                          backgroundColor: getStatusColor(task.status),
                          color: 'white',
                        }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ width: 100 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography variant="body2">{task.progress}%</Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={task.progress}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: 'rgba(0,0,0,0.1)',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: getStatusColor(task.status),
                          },
                        }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleViewDetails(task)}
                        sx={{ color: '#0a2d82' }}
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={(e) => handleStatusMenuOpen(e, task)}
                        sx={{ color: '#0a2d82' }}
                      >
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

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            backgroundColor: 'white',
            borderRadius: 2,
            mt: 3,
          }}
        >
          <Assignment sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No tasks found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your filters or create a new task.
          </Typography>
        </Box>
      )}

      {/* Status Update Menu */}
      <Menu
        anchorEl={statusMenuAnchor}
        open={Boolean(statusMenuAnchor)}
        onClose={handleStatusMenuClose}
      >
        <MenuItem onClick={() => handleStatusUpdate('pending')}>
          <Pending sx={{ mr: 1, fontSize: 16 }} />
          Pending
        </MenuItem>
        <MenuItem onClick={() => handleStatusUpdate('in-progress')}>
          <Schedule sx={{ mr: 1, fontSize: 16 }} />
          In Progress
        </MenuItem>
        <MenuItem onClick={() => handleStatusUpdate('completed')}>
          <CheckCircle sx={{ mr: 1, fontSize: 16 }} />
          Completed
        </MenuItem>
      </Menu>

      {/* Task Details Dialog */}
      <Dialog
        open={detailsDialogOpen}
        onClose={() => setDetailsDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedTask && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Assignment sx={{ color: '#0a2d82' }} />
                <Typography variant="h6">{selectedTask.taskName}</Typography>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Department / Category
                  </Typography>
                  <Typography variant="body2">
                    {selectedTask.department} / {selectedTask.category}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Assigned By
                  </Typography>
                  <Typography variant="body2">{selectedTask.assignedBy}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Start Date
                  </Typography>
                  <Typography variant="body2">{selectedTask.startDate}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    End Date
                  </Typography>
                  <Typography variant="body2">{selectedTask.endDate}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Status
                  </Typography>
                  <Chip
                    label={getStatusText(selectedTask.status)}
                    sx={{
                      backgroundColor: getStatusColor(selectedTask.status),
                      color: 'white',
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Priority
                  </Typography>
                  <Chip
                    label={selectedTask.priority}
                    sx={{
                      backgroundColor: getPriorityColor(selectedTask.priority),
                      color: 'white',
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Description
                  </Typography>
                  <Typography variant="body2">{selectedTask.description}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Assignee
                  </Typography>
                  <Typography variant="body2">{selectedTask.assignee}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Progress
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2">{selectedTask.progress}%</Typography>
                    <LinearProgress
                      variant="determinate"
                      value={selectedTask.progress}
                      sx={{ width: 100 }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Estimated Hours
                  </Typography>
                  <Typography variant="body2">{selectedTask.estimatedHours} hours</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Actual Hours
                  </Typography>
                  <Typography variant="body2">{selectedTask.actualHours} hours</Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDetailsDialogOpen(false)}>Close</Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#0a2d82', '&:hover': { backgroundColor: '#071f5c' } }}
              >
                Edit Task
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default InternalTasks;
