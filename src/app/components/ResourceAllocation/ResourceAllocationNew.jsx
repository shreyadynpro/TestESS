import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
  IconButton,
} from '@mui/material';
import {
  Search,
  Visibility,
  Edit,
  MoreVert,
  Add,
  Refresh,
  Person,
  Business,
} from '@mui/icons-material';

const ResourceAllocationNew = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [projectFilter, setProjectFilter] = useState('all');

  // Sample data
  const allocations = [
    {
      id: 1,
      employeeName: 'John Smith',
      department: 'IT',
      projectName: 'Cloud Migration',
      role: 'Senior Developer',
      allocationPercentage: 100,
      startDate: '2025-01-01',
      endDate: '2025-03-31',
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
    },
  ];

  const departments = ['all', 'IT', 'HR', 'Finance'];
  const projects = ['all', 'Cloud Migration', 'HR System Upgrade', 'Financial Analytics', 'Mobile App Development'];

  const getAllocationColor = (percentage) => {
    if (percentage >= 90) return '#f44336';
    if (percentage >= 70) return '#ff9800';
    if (percentage >= 40) return '#4caf50';
    return '#2196f3';
  };

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

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
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
              sx={{ minWidth: 250 }}
            />
            
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

            <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={() => {
                  setSearchTerm('');
                  setDepartmentFilter('all');
                  setProjectFilter('all');
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
          </Box>
        </CardContent>
      </Card>

      {/* Table */}
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
              {allocations.map((allocation) => (
                <TableRow key={allocation.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ width: 32, height: 32 }}>
                        {allocation.employeeName.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <Typography variant="body2" fontWeight="medium">
                        {allocation.employeeName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{allocation.department}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {allocation.projectName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{allocation.role}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 60, height: 8, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 4 }}>
                        <Box
                          sx={{
                            width: `${allocation.allocationPercentage}%`,
                            height: '100%',
                            backgroundColor: getAllocationColor(allocation.allocationPercentage),
                            borderRadius: 4,
                          }}
                        />
                      </Box>
                      <Typography variant="body2" fontWeight="medium">
                        {allocation.allocationPercentage}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{allocation.startDate}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{allocation.endDate}</Typography>
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
    </Box>
  );
};

export default ResourceAllocationNew;
