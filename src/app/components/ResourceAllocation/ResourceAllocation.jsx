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
  Avatar,
  LinearProgress,
} from '@mui/material';
import {
  Search,
  FilterList,
  Visibility,
  Edit,
  MoreVert,
  Business,
  Person,
  Assignment,
  TrendingUp,
  Add,
  Refresh,
  DateRange,
  PieChart,
  Timeline,
} from '@mui/icons-material';

const ResourceAllocation = () => {
  const [allocations, setAllocations] = useState([]);
  const [filteredAllocations, setFilteredAllocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [projectFilter, setProjectFilter] = useState('all');
  const [employeeFilter, setEmployeeFilter] = useState('all');
  const [dateRangeFilter, setDateRangeFilter] = useState({ start: null, end: null });
  const [selectedAllocation, setSelectedAllocation] = useState(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Dummy data for resource allocations
  const dummyAllocations = [
    {
      id: 1,
      employeeName: 'John Smith',
      department: 'IT',
      projectName: 'Cloud Migration',
      role: 'Senior Developer',
      allocationPercentage: 100,
      startDate: '2025-01-01',
      endDate: '2025-03-31',
      skills: ['React', 'Node.js', 'AWS'],
      manager: 'David Wilson',
      projectCode: 'CM-2025-001',
      location: 'Bangalore',
      billable: true,
    },
    {
      id: 2,
      employeeName: 'Sarah Johnson',
      department: 'HR',
      projectName: 'HR System Upgrade',
      role: 'Project Manager',
      allocationPercentage: 75,
      startDate: '2025-01-15',
      endDate: '2025-04-15',
      skills: ['Project Management', 'HR Systems'],
      manager: 'Lisa Anderson',
      projectCode: 'HR-2025-002',
      location: 'Mumbai',
      billable: true,
    },
    {
      id: 3,
      employeeName: 'Michael Chen',
      department: 'Finance',
      projectName: 'Financial Analytics',
      role: 'Data Analyst',
      allocationPercentage: 50,
      startDate: '2025-02-01',
      endDate: '2025-05-31',
      skills: ['Python', 'SQL', 'Tableau'],
      manager: 'Robert Brown',
      projectCode: 'FA-2025-003',
      location: 'Delhi',
      billable: false,
    },
    {
      id: 4,
      employeeName: 'Emily Davis',
      department: 'IT',
      projectName: 'Mobile App Development',
      role: 'UI/UX Designer',
      allocationPercentage: 80,
      startDate: '2025-01-10',
      endDate: '2025-04-10',
      skills: ['Figma', 'Adobe XD', 'Prototyping'],
      manager: 'David Wilson',
      projectCode: 'MA-2025-004',
      location: 'Bangalore',
      billable: true,
    },
    {
      id: 5,
      employeeName: 'Alex Kumar',
      department: 'IT',
      projectName: 'Cloud Migration',
      role: 'DevOps Engineer',
      allocationPercentage: 60,
      startDate: '2025-01-01',
      endDate: '2025-03-31',
      skills: ['Docker', 'Kubernetes', 'CI/CD'],
      manager: 'David Wilson',
      projectCode: 'CM-2025-001',
      location: 'Bangalore',
      billable: true,
    },
    {
      id: 6,
      employeeName: 'Rachel Green',
      department: 'Marketing',
      projectName: 'Digital Campaign',
      role: 'Marketing Specialist',
      allocationPercentage: 90,
      startDate: '2025-01-20',
      endDate: '2025-03-20',
      skills: ['Digital Marketing', 'SEO', 'Analytics'],
      manager: 'Tom Martinez',
      projectCode: 'DC-2025-005',
      location: 'Mumbai',
      billable: true,
    },
    {
      id: 7,
      employeeName: 'Kevin Zhang',
      department: 'IT',
      projectName: 'Database Optimization',
      role: 'Database Administrator',
      allocationPercentage: 70,
      startDate: '2025-02-15',
      endDate: '2025-05-15',
      skills: ['Oracle', 'MySQL', 'Performance Tuning'],
      manager: 'David Wilson',
      projectCode: 'DO-2025-006',
      location: 'Bangalore',
      billable: true,
    },
    {
      id: 8,
      employeeName: 'Jessica Lee',
      department: 'Marketing',
      projectName: 'Digital Campaign',
      role: 'Content Creator',
      allocationPercentage: 40,
      startDate: '2025-01-20',
      endDate: '2025-03-20',
      skills: ['Content Writing', 'Social Media', 'Copywriting'],
      manager: 'Tom Martinez',
      projectCode: 'DC-2025-005',
      location: 'Mumbai',
      billable: true,
    },
    {
      id: 9,
      employeeName: 'Brian Taylor',
      department: 'Sales',
      projectName: 'CRM Implementation',
      role: 'Business Analyst',
      allocationPercentage: 85,
      startDate: '2025-01-05',
      endDate: '2025-04-05',
      skills: ['CRM', 'Business Analysis', 'Requirements Gathering'],
      manager: 'Amanda Foster',
      projectCode: 'CRM-2025-007',
      location: 'Delhi',
      billable: true,
    },
    {
      id: 10,
      employeeName: 'Mark Johnson',
      department: 'Admin',
      projectName: 'Office Modernization',
      role: 'Operations Coordinator',
      allocationPercentage: 100,
      startDate: '2025-02-01',
      endDate: '2025-04-30',
      skills: ['Operations', 'Vendor Management', 'Logistics'],
      manager: 'Jennifer White',
      projectCode: 'OM-2025-008',
      location: 'Delhi',
      billable: false,
    },
  ];

  useEffect(() => {
    setAllocations(dummyAllocations);
    setFilteredAllocations(dummyAllocations);
  }, []);

  useEffect(() => {
    let filtered = allocations;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(allocation =>
        allocation.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        allocation.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        allocation.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply department filter
    if (departmentFilter !== 'all') {
      filtered = filtered.filter(allocation => allocation.department === departmentFilter);
    }

    // Apply project filter
    if (projectFilter !== 'all') {
      filtered = filtered.filter(allocation => allocation.projectName === projectFilter);
    }

    // Apply employee filter
    if (employeeFilter !== 'all') {
      filtered = filtered.filter(allocation => allocation.employeeName === employeeFilter);
    }

    // Apply date range filter
    if (dateRangeFilter.start && dateRangeFilter.end) {
      filtered = filtered.filter(allocation => {
        const allocationStart = new Date(allocation.startDate);
        const allocationEnd = new Date(allocation.endDate);
        const filterStart = new Date(dateRangeFilter.start);
        const filterEnd = new Date(dateRangeFilter.end);
        return allocationStart >= filterStart && allocationEnd <= filterEnd;
      });
    }

    setFilteredAllocations(filtered);
  }, [allocations, searchTerm, departmentFilter, projectFilter, employeeFilter, dateRangeFilter]);

  const getAllocationColor = (percentage) => {
    if (percentage >= 90) return '#f44336'; // Red for over-allocated
    if (percentage >= 70) return '#ff9800'; // Orange for high allocation
    if (percentage >= 40) return '#4caf50'; // Green for optimal
    return '#2196f3'; // Blue for low allocation
  };

  const getAllocationStatus = (percentage) => {
    if (percentage >= 90) return 'Over-allocated';
    if (percentage >= 70) return 'High Allocation';
    if (percentage >= 40) return 'Optimal';
    return 'Low Allocation';
  };

  const handleViewDetails = (allocation) => {
    setSelectedAllocation(allocation);
    setDetailsDialogOpen(true);
  };

  const handleEditAllocation = (allocation) => {
    setSelectedAllocation(allocation);
    setEditDialogOpen(true);
  };

  const departments = ['all', ...new Set(allocations.map(a => a.department))];
  const projects = ['all', ...new Set(allocations.map(a => a.projectName))];
  const employees = ['all', ...new Set(allocations.map(a => a.employeeName))];

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Resource Allocation
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage and track employee resource allocations across projects
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={3}>
          <Card sx={{ backgroundColor: '#1a2038', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Person sx={{ fontSize: 40, mb: 1, color: '#64b5f6' }} />
              <Typography variant="h6" gutterBottom>
                {allocations.length}
              </Typography>
              <Typography variant="body2">Total Allocations</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ backgroundColor: '#1a2038', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Business sx={{ fontSize: 40, mb: 1, color: '#81c784' }} />
              <Typography variant="h6" gutterBottom>
                {new Set(allocations.map(a => a.projectName)).size}
              </Typography>
              <Typography variant="body2">Active Projects</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ backgroundColor: '#1a2038', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <TrendingUp sx={{ fontSize: 40, mb: 1, color: '#ffb74d' }} />
              <Typography variant="h6" gutterBottom>
                {allocations.filter(a => a.allocationPercentage >= 90).length}
              </Typography>
              <Typography variant="body2">Over-allocated</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ backgroundColor: '#1a2038', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <PieChart sx={{ fontSize: 40, mb: 1, color: '#e57373' }} />
              <Typography variant="h6" gutterBottom>
                {Math.round(allocations.reduce((sum, a) => sum + a.allocationPercentage, 0) / allocations.length)}%
              </Typography>
              <Typography variant="body2">Avg Allocation</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                placeholder="Search allocations..."
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
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Project</InputLabel>
                <Select
                  value={projectFilter}
                  label="Project"
                  onChange={(e) => setProjectFilter(e.target.value)}
                >
                  {projects.map(project => (
                    <MenuItem key={project} value={project}>
                      {project === 'all' ? 'All Projects' : project}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Employee</InputLabel>
                <Select
                  value={employeeFilter}
                  label="Employee"
                  onChange={(e) => setEmployeeFilter(e.target.value)}
                >
                  {employees.map(employee => (
                    <MenuItem key={employee} value={employee}>
                      {employee === 'all' ? 'All Employees' : employee}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={1}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                value={dateRangeFilter.start || ''}
                onChange={(e) => setDateRangeFilter(prev => ({ ...prev, start: e.target.value }))}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={1}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                value={dateRangeFilter.end || ''}
                onChange={(e) => setDateRangeFilter(prev => ({ ...prev, end: e.target.value }))}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  onClick={() => {
                    setSearchTerm('');
                    setDepartmentFilter('all');
                    setProjectFilter('all');
                    setEmployeeFilter('all');
                    setDateRangeFilter({ start: null, end: null });
                  }}
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  sx={{ backgroundColor: '#0a2d82', '&:hover': { backgroundColor: '#071f5c' } }}
                >
                  New Allocation
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Allocations Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1a2038' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Employee Name</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Department</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Project Name</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Role</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Allocation %</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Start Date</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>End Date</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAllocations.map((allocation) => (
                <TableRow key={allocation.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ width: 32, height: 32, fontSize: '0.9rem' }}>
                        {allocation.employeeName.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {allocation.employeeName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {allocation.location}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{allocation.department}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {allocation.projectName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {allocation.projectCode}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{allocation.role}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 60 }}>
                        <LinearProgress
                          variant="determinate"
                          value={allocation.allocationPercentage}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: getAllocationColor(allocation.allocationPercentage),
                            },
                          }}
                        />
                      </Box>
                      <Typography variant="body2" fontWeight="medium">
                        {allocation.allocationPercentage}%
                      </Typography>
                    </Box>
                    <Chip
                      label={getAllocationStatus(allocation.allocationPercentage)}
                      size="small"
                      sx={{
                        backgroundColor: getAllocationColor(allocation.allocationPercentage),
                        color: 'white',
                        fontSize: '0.7rem',
                        mt: 0.5,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{allocation.startDate}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{allocation.endDate}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleViewDetails(allocation)}
                        sx={{ color: '#0a2d82' }}
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleEditAllocation(allocation)}
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
      {filteredAllocations.length === 0 && (
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
            No allocations found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your filters or create a new allocation.
          </Typography>
        </Box>
      )}

      {/* Details Dialog */}
      <Dialog
        open={detailsDialogOpen}
        onClose={() => setDetailsDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedAllocation && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Person sx={{ color: '#0a2d82' }} />
                <Typography variant="h6">Resource Allocation Details</Typography>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Employee Name
                  </Typography>
                  <Typography variant="body2">{selectedAllocation.employeeName}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Department
                  </Typography>
                  <Typography variant="body2">{selectedAllocation.department}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Project Name
                  </Typography>
                  <Typography variant="body2">{selectedAllocation.projectName}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Project Code
                  </Typography>
                  <Typography variant="body2">{selectedAllocation.projectCode}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Role
                  </Typography>
                  <Typography variant="body2">{selectedAllocation.role}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Allocation Percentage
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2">{selectedAllocation.allocationPercentage}%</Typography>
                    <Chip
                      label={getAllocationStatus(selectedAllocation.allocationPercentage)}
                      sx={{
                        backgroundColor: getAllocationColor(selectedAllocation.allocationPercentage),
                        color: 'white',
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Start Date
                  </Typography>
                  <Typography variant="body2">{selectedAllocation.startDate}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    End Date
                  </Typography>
                  <Typography variant="body2">{selectedAllocation.endDate}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Manager
                  </Typography>
                  <Typography variant="body2">{selectedAllocation.manager}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Location
                  </Typography>
                  <Typography variant="body2">{selectedAllocation.location}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Skills
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {selectedAllocation.skills.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.7rem' }}
                      />
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Billable
                  </Typography>
                  <Chip
                    label={selectedAllocation.billable ? 'Billable' : 'Non-Billable'}
                    color={selectedAllocation.billable ? 'success' : 'default'}
                    size="small"
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDetailsDialogOpen(false)}>Close</Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#0a2d82', '&:hover': { backgroundColor: '#071f5c' } }}
                onClick={() => {
                  setDetailsDialogOpen(false);
                  handleEditAllocation(selectedAllocation);
                }}
              >
                Edit Allocation
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Edit Allocation Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Edit sx={{ color: '#0a2d82' }} />
            <Typography variant="h6">Edit Resource Allocation</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Allocation Percentage</InputLabel>
                <Select
                  defaultValue={selectedAllocation?.allocationPercentage || 100}
                  label="Allocation Percentage"
                >
                  <MenuItem value={25}>25%</MenuItem>
                  <MenuItem value={50}>50%</MenuItem>
                  <MenuItem value={75}>75%</MenuItem>
                  <MenuItem value={100}>100%</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                defaultValue={selectedAllocation?.endDate || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={3}
                placeholder="Add any notes about this allocation..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#0a2d82', '&:hover': { backgroundColor: '#071f5c' } }}
            onClick={() => setEditDialogOpen(false)}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ResourceAllocation;
