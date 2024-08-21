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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
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
  padding: theme.spacing(1),
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
      contactNo: '123-456-7890',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      department: 'Marketing',
      role: 'Marketing Manager',
      designation: 'Manager',
      contactNo: '234-567-8901',
    },
    {
      id: 3,
      name: 'Samuel Green',
      email: 'samuel.green@example.com',
      department: 'Sales',
      role: 'Sales Executive',
      designation: 'Executive',
      contactNo: '345-678-9012',
    },
  ]);

  const [open, setOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    department: '',
    role: '',
    designation: '',
    contactNo: '',
  });

  const handleEditClick = (employee) => {
    setCurrentEmployee(employee);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentEmployee(null);
  };

  const handleSave = () => {
    const updatedRows = employees.map((row) =>
      row.id === currentEmployee.id ? currentEmployee : row
    );
    setEmployees(updatedRows);
    handleClose();
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  const handleAddClick = () => {
    setOpenAddDialog(true);
  };

  const handleAddClose = () => {
    setOpenAddDialog(false);
    setNewEmployee({
      name: '',
      email: '',
      department: '',
      role: '',
      designation: '',
      contactNo: '',
    });
  };

  const handleAddSave = () => {
    if (newEmployee.name && newEmployee.email) {
      // Ensure required fields are filled
      setEmployees([...employees, { id: employees.length + 1, ...newEmployee }]);
      handleAddClose();
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Employee List
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddClick}
          startIcon={<AddIcon />}
        >
          Add Employee
        </Button>
      </Box>
      <StyledTableContainer component={Paper}>
        <StyledTable>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Department</StyledTableCell>
              <StyledTableCell align="center">Role</StyledTableCell>
              <StyledTableCell align="center">Designation</StyledTableCell>
              <StyledTableCell align="center">Contact No</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <StyledTableRow key={employee.id}>
                <TableCell align="center">{employee.id}</TableCell>
                <TableCell align="center">{employee.name}</TableCell>
                <TableCell align="center">{employee.email}</TableCell>
                <TableCell align="center">{employee.department}</TableCell>
                <TableCell align="center">{employee.role}</TableCell>
                <TableCell align="center">{employee.designation}</TableCell>
                <TableCell align="center">{employee.contactNo}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleEditClick(employee)} sx={{ color: 'blue' }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(employee.id)} sx={{ color: 'red' }}>
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
              onChange={(e) =>
                setCurrentEmployee({
                  ...currentEmployee,
                  department: e.target.value,
                })
              }
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
              onChange={(e) =>
                setCurrentEmployee({
                  ...currentEmployee,
                  designation: e.target.value,
                })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Contact No"
              fullWidth
              value={currentEmployee ? currentEmployee.contactNo : ''}
              onChange={(e) =>
                setCurrentEmployee({
                  ...currentEmployee,
                  contactNo: e.target.value,
                })
              }
              sx={{ mb: 2 }}
            />
          </DialogContentBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAddDialog} onClose={handleAddClose}>
        <DialogTitle>Add Employee</DialogTitle>
        <DialogContent>
          <DialogContentBox>
            <TextField
              margin="dense"
              label="Name"
              fullWidth
              value={newEmployee.name}
              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Email"
              fullWidth
              value={newEmployee.email}
              onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Department"
              fullWidth
              value={newEmployee.department}
              onChange={(e) =>
                setNewEmployee({
                  ...newEmployee,
                  department: e.target.value,
                })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Role"
              fullWidth
              value={newEmployee.role}
              onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Designation"
              fullWidth
              value={newEmployee.designation}
              onChange={(e) =>
                setNewEmployee({
                  ...newEmployee,
                  designation: e.target.value,
                })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Contact No"
              fullWidth
              value={newEmployee.contactNo}
              onChange={(e) =>
                setNewEmployee({
                  ...newEmployee,
                  contactNo: e.target.value,
                })
              }
              sx={{ mb: 2 }}
            />
          </DialogContentBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleAddSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeeList;
