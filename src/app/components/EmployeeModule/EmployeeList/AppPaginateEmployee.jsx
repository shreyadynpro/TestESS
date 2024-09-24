import { Box, Table, TableBody, TableCell, TableHead, TableRow, styled } from '@mui/material';
import AppPaginateTableFooter from 'app/components/ReusableComponents/AppPaginateTableFooter';
import AppTableLinearProgress from 'app/components/ReusableComponents/AppTableLinearProgress';
import React, { useRef, useState } from 'react';
const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
  },
  '& tbody': {
    '& tr': {
      '& td': { paddingLeft: 0, textTransform: 'capitalize' },
      '&:hover': {
        cursor: 'pointer',
      },
      '&:hover': {
        // Set font color on hover
        '& td': {
          color: '#007bff', // Change to your desired hover font color
        },
      },
    },
  },
}));

const PaginationTable = ({ data = [], fetchData, onPageSet, page, loading, onRowClick }) => {
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangePage = (_, newPage) => {
    onPageSet(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    onPageSet(0);
  };

  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>PAN</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={3}>
                <AppTableLinearProgress />
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3}>
                <p>No Records found</p>
              </TableCell>
            </TableRow>
          ) : (
            data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((emp, index) => (
              <TableRow key={index} onClick={() => onRowClick(emp)}>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.email1}</TableCell>
                <TableCell>{emp.identity_no}</TableCell>
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
