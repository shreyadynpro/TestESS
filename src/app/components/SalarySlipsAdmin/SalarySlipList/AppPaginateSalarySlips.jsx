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
import DownloadIcon from '@mui/icons-material/Download';

const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } },
  },
}));

const PaginationTable = ({ data = [], fetchData, onPageSet, page, loading, handleDownload }) => {
  const currentRole = useRef(null);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const navigate = useNavigate();
  const roleEditPermission = useSelector(
    (state) => state.userAccessPermissions?.userPermissions?.role_edit
  );
  const roleDeletePermission = useSelector(
    (state) => state.userAccessPermissions?.userPermissions?.role_delete
  );

  const handleChangePage = (_, newPage) => {
    onPageSet(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    onPageSet(0);
  };

  const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] = useState(false);
  const handleDialogClose = () => {
    setShouldOpenConfirmationDialog(false);
  };

  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Month</TableCell>
            <TableCell align="left">Year</TableCell>
            <TableCell align="left">Emp Id</TableCell>
            <TableCell align="left">PAN No.</TableCell>
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
            data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((slips, index) => (
              <TableRow key={index}>
                <TableCell align="left">{slips.name}</TableCell>
                <TableCell align="left">{slips.month}</TableCell>
                <TableCell align="left">{slips.year}</TableCell>
                <TableCell align="left">{slips.employee_ids}</TableCell>
                <TableCell align="left">{slips.identity_no}</TableCell>
                <TableCell align="left">
                  <IconButton
                    edge="end"
                    aria-label="download"
                    onClick={(e) => {
                      handleDownload(slips);
                    }}
                  >
                    <DownloadIcon />
                  </IconButton>
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
    </Box>
  );
};

export default PaginationTable;
