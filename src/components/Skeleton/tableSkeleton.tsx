// TableSkeletonLoader.jsx

import React from 'react';
import { Skeleton, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';

const TableSkeletonLoader = () => {
  return (
    <TableContainer data-testid="table-skeleton-loader" component={Paper}>
      <Table>
        <TableBody>
          {/* Table Header Skeleton */}
          <TableRow>
            <TableCell>
              <Skeleton variant="text" animation="wave" />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" animation="wave" />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" animation="wave" />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" animation="wave" />
            </TableCell>
          </TableRow>

          {[1, 2, 3, 4].map((index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton variant="text" animation="wave" />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" animation="wave" />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" animation="wave" />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" animation="wave" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableSkeletonLoader;
