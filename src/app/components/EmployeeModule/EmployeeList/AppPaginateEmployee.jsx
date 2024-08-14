import {
  Box,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import commonConfig from 'app/components/commonConfig';
import commonRoutes from 'app/components/commonRoutes';
import AppConfirmationDialog from 'app/components/ReusableComponents/AppConfirmationDialog';
import AppEditIcon from 'app/components/ReusableComponents/AppEditIcon';
import AppPaginateTableFooter from 'app/components/ReusableComponents/AppPaginateTableFooter';
import AppTableLinearProgress from 'app/components/ReusableComponents/AppTableLinearProgress';
import { getAccessToken } from 'app/utils/utils';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SnackbarUtils from 'SnackbarUtils';

const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } },
  },
}));

const PaginationTable = ({ data = [], fetchData, onPageSet, page, loading }) => {
  const currentRole = useRef(null);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const navigate = useNavigate();
  const employeeEditPermission = useSelector(
    (state) => state.userAccessPermissions?.userPermissions?.employees_edit
  );
  const employeeDeletePermission = useSelector(
    (state) => state.userAccessPermissions?.userPermissions?.employees_delete
  );

  const handleChangePage = (_, newPage) => {
    onPageSet(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    onPageSet(0);
  };

  const handleConfirmationResponse = async (empId) => {
    if (empId) {
      const authToken = getAccessToken();
      try {
        const response = await axios.delete(commonConfig.urls.employee + '/' + empId, {
          headers: { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' },
        });
        if (response && response.data.Status === 'Success') {
          fetchData();
          SnackbarUtils.success(response.data.Message);
          navigate(commonRoutes.employeeMaster.employeeMasterlist, {
            state: { openSnackbar: true, msgSnackbar: 'DELETION SUCCESSFUL' },
          });
        }
        currentRole.current = null;
        handleDialogClose();
      } catch (error) {
        SnackbarUtils.error(error?.message || 'Something went wrong!!');
      }
    }
  };

  const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] = useState(false);
  const handleDialogClose = () => {
    setShouldOpenConfirmationDialog(false);
  };

  const handleDeleteEmployee = () => {
    setShouldOpenConfirmationDialog(true);
  };

  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left">First Name</TableCell>
            <TableCell align="left">Last Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell align="left" colSpan={3}>
                <AppTableLinearProgress />
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <p>No Records found</p>
          ) : (
            data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((emp, index) => (
              <TableRow key={index}>
                <TableCell align="left">{emp.first_name}</TableCell>
                <TableCell align="left">{emp.last_name}</TableCell>
                <TableCell align="left">{emp.email1}</TableCell>
                <TableCell align="left">
                  {employeeEditPermission === 1 && (
                    <IconButton
                      onClick={() =>
                        navigate(commonRoutes.employeeMaster.employeeMasterEdit, {
                          state: { ...emp },
                        })
                      }
                    >
                      <AppEditIcon />
                    </IconButton>
                  )}
                  {employeeDeletePermission === 1 && (
                    <IconButton
                      onClick={() => {
                        handleDeleteEmployee();
                        currentRole.current = emp;
                      }}
                    >
                      <Icon color="error">delete</Icon>
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </StyledTable>

      <AppPaginateTableFooter
        page={page}
        data={data}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
      {shouldOpenConfirmationDialog && (
        <AppConfirmationDialog
          text="Are you sure to delete"
          delVal={currentRole.current?.role}
          open={shouldOpenConfirmationDialog}
          onConfirmDialogClose={handleDialogClose}
          onYesClick={() => handleConfirmationResponse(currentRole.current?.role_id)}
        />
      )}
    </Box>
  );
};

export default PaginationTable;
