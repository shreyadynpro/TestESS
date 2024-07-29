import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  useTheme,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(2),
  borderRadius: 8,
  overflow: 'hidden',
  boxShadow: theme.shadows[3],
}));

const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.grey[200],
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.grey[100],
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const DialogContentBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const EmployeeList = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      department: 'Engineering',
      role: 'Software Engineer',
      designation: 'Senior Developer',
      contactNo: '123-456-7890'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      department: 'Marketing',
      role: 'Marketing Manager',
      designation: 'Manager',
      contactNo: '234-567-8901'
    },
    {
      id: 3,
      name: 'Samuel Green',
      email: 'samuel.green@example.com',
      department: 'Sales',
      role: 'Sales Executive',
      designation: 'Executive',
      contactNo: '345-678-9012'
    },
  ]);

  const [open, setOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const handleEditClick = (employee) => {
    setCurrentEmployee(employee);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentEmployee(null);
  };

  const handleSave = () => {
    // Implement save logic here
    setOpen(false);
  };

  const handleDelete = (id) => {
    // Implement delete logic here
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Employee List
      </Typography>
      <StyledTableContainer component={Paper}>
        <StyledTable>
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Department</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell>Designation</StyledTableCell>
              <StyledTableCell>Contact No</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <StyledTableRow key={employee.id}>
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>{employee.designation}</TableCell>
                <TableCell>{employee.contactNo}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(employee)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(employee.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent>
          <DialogContentBox>
            <TextField
              margin="dense"
              label="Name"
              fullWidth
              value={currentEmployee ? currentEmployee.name : ''}
              onChange={(e) => setCurrentEmployee({ ...currentEmployee, name: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Email"
              fullWidth
              value={currentEmployee ? currentEmployee.email : ''}
              onChange={(e) => setCurrentEmployee({ ...currentEmployee, email: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Department"
              fullWidth
              value={currentEmployee ? currentEmployee.department : ''}
              onChange={(e) => setCurrentEmployee({ ...currentEmployee, department: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Role"
              fullWidth
              value={currentEmployee ? currentEmployee.role : ''}
              onChange={(e) => setCurrentEmployee({ ...currentEmployee, role: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Designation"
              fullWidth
              value={currentEmployee ? currentEmployee.designation : ''}
              onChange={(e) => setCurrentEmployee({ ...currentEmployee, designation: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Contact No"
              fullWidth
              value={currentEmployee ? currentEmployee.contactNo : ''}
              onChange={(e) => setCurrentEmployee({ ...currentEmployee, contactNo: e.target.value })}
              sx={{ mb: 2 }}
            />
          </DialogContentBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeeList;
