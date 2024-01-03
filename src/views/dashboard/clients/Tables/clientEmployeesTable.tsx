import { IDev } from '../../../../types/devs';
import NoData from '../../../../components/NoData';
import { AssignmentLate, AssignmentLateTwoTone, DeleteTwoTone } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Table,
  Grid,
  List,
  Paper,
  Typography,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  useTheme,
  Card,
  CardHeader,
  Divider,
  Avatar,
} from '@mui/material';
import { useState, MouseEvent, ChangeEvent } from 'react';

import { format, subHours, subWeeks, subDays } from 'date-fns';
import { logs } from '../../../../components/settings/SecurityTab';
import DevRow from '../components/devRoles';
interface IClientDevs {
  devs: IDev[];
}
function ClientEmployees({ devs }: IClientDevs) {
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  if (!devs.length) {
    return <NoData />;
  }
  return (
    <Grid item xs={12}>
      <Paper elevation={3}>
        <Card>
          <CardHeader subheaderTypographyProps={{}} titleTypographyProps={{}} title="Team Members" subheader="Team memeber for this client" />

          <Box p={2}>
            <List>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Experience</TableCell>
                      {/* <TableCell>Location</TableCell> */}
                      <TableCell>startDate</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <DevRow devs={devs} />
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
            </List>
          </Box>
          <Divider />
          {/*  */}
        </Card>
      </Paper>
    </Grid>
  );
}

export default ClientEmployees;
