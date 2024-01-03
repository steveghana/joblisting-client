import { DeleteTwoTone } from '@mui/icons-material';
import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, useTheme } from '@mui/material';
import { useState, MouseEvent, ChangeEvent } from 'react';

import { format, subHours, subWeeks, subDays } from 'date-fns';

const CustomTable = ({ data }: { data: Record<string, any>[] }) => {
  const theme = useTheme();

  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Browser</TableCell>
              <TableCell>IP Address</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Date/Time</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((log) => (
              <TableRow key={log.id} hover>
                <TableCell>{log.browser}</TableCell>
                <TableCell>{log.ipaddress}</TableCell>
                <TableCell>{log.location}</TableCell>
                <TableCell>{format(log.date, 'dd MMMM, yyyy - h:mm:ss a')}</TableCell>
                <TableCell align="right">
                  <Tooltip placement="top" title="Delete" arrow>
                    <IconButton
                      sx={{
                        '&:hover': {
                          background: theme.colors?.error.lighter,
                        },
                        color: theme.palette.error.main,
                      }}
                      color="inherit"
                      size="small"
                    >
                      <DeleteTwoTone fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={100}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </>
  );
};

export default CustomTable;
