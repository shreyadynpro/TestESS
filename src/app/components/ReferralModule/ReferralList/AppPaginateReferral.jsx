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
  Tooltip,
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
import VisibilityIcon from '@mui/icons-material/Visibility';
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

const PaginationTable = ({
  data = [],
  fetchData,
  onPageSet,
  page,
  loading,
  handlePreview,
  downloadPayslip,
}) => {
  const currentRole = useRef(null);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const navigate = useNavigate();

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

  const handleDeleteRole = () => {
    setShouldOpenConfirmationDialog(true);
  };

  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Contact No</TableCell>
            <TableCell>Skill</TableCell>
            <TableCell>Exp (Years)</TableCell>
            <TableCell>PAN</TableCell>
            <TableCell>Current Location</TableCell>
            <TableCell>Referred By</TableCell>
            <TableCell>Referred At</TableCell>
            <TableCell>Attachment</TableCell>
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
            data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((referral, index) => (
                <TableRow key={index}>
                  <TableCell>{referral.fullName || referral.full_name}</TableCell>
                  <TableCell>{referral.email}</TableCell>
                  <TableCell>{referral.contactNo || referral.contact_no}</TableCell>
                  <TableCell>{referral.skills}</TableCell>
                  <TableCell>{referral.experience}</TableCell>
                  <TableCell>{referral.pan}</TableCell>
                  <TableCell>{referral.currentLocation || referral.current_location}</TableCell>
                  <TableCell>
                    {referral.first_name}&nbsp;
                    {referral.last_name}
                  </TableCell>
                  <TableCell>{new Date(referral.created_at).toISOString().split('T')[0]}</TableCell>

                  <TableCell>
                    {referral.attachment_path ? (
                      <>
                        <IconButton
                          edge="end"
                          onClick={() => handlePreview(referral.id, referral.attachment_path)}
                          sx={{ color: '#59919d' }} // Style the view button
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <Tooltip title="Download">
                          <IconButton
                            edge="end"
                            aria-label="download"
                            style={{
                              marginLeft: '1rem',
                              color: '#59919d',
                            }}
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent triggering the ListItem's onClick
                              downloadPayslip(referral.id, referral.full_name);
                            }}
                          >
                            <DownloadIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    ) : (
                      // If attachment_path is null or empty, render an empty cell
                      <span></span>
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
          open={shouldOpenConfirmationDialog}
          onConfirmDialogClose={handleDialogClose}
        />
      )}
    </Box>
  );
};

export default PaginationTable;
