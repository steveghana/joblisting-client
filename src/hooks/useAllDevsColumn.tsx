import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { IDev } from '../types/devs';
import { Avatar, Box } from '@mui/material';
import { getRandomColor } from '@/utils/generateRandomColors';
export const useDevsColums = () => {
  return useMemo<MRT_ColumnDef<IDev>[]>(
    () => [
      {
        id: 'employee', //id used to define `group` column
        header: 'Employee',
        columns: [
          {
            accessorFn: (row) => `${row.firstName} ${row.lastName}`, //accessorFn used to join multiple data into a single cell
            id: 'name', //id is still required when using accessorFn instead of accessorKey
            header: 'Name',
            enableEditing: false,

            size: 200,
            Cell: ({
              renderedCellValue,
              row: {
                original: { avatar, firstName, lastName },
              },
            }) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                {/* <Avatar sx={{}} /> */}
                <Avatar sx={{ backgroundColor: getRandomColor(), color: 'white', fontSize: '.85rem' }} src={avatar}>
                  {' '}
                  {!avatar && `${firstName[0]?.toUpperCase()}${lastName.length ? lastName[0]?.toUpperCase() : ''}`}
                </Avatar>

                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            header: 'Status',
            accessorFn: (originalRow) => originalRow.workStatus, //must be strings
            id: 'isActive',
            filterVariant: 'select',
            enableEditing: false,
            Cell: ({ cell }) => (
              <Box
                component="span"
                sx={(theme) => ({
                  backgroundColor: cell.getValue<string>() === 'Active' ? theme.palette.success.light : theme.palette.warning.main,

                  borderRadius: '0.25rem',
                  color: '#fff',
                  maxWidth: '9ch',
                  p: '0.25rem',
                })}
              >
                {cell.getValue<string>()}
              </Box>
            ),
            size: 50,
          },
          {
            accessorKey: 'email', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            enableEditing: false,

            filterVariant: 'autocomplete',
            header: 'Email',
            size: 100,
          },
          {
            id: 'clientName',
            accessorKey: 'clientName', //hey a simple column for once
            header: 'Client Name',
            Cell: ({ cell }) => <Box>{cell.getValue<string>() || 'N/A'}</Box>,

            enableEditing: false,
            size: 200,
          },
          {
            id: 'companyName',
            accessorKey: 'companyName', //hey a simple column for once
            header: 'Company Name',
            Cell: ({ cell }) => <Box>{cell.getValue<string>() || 'N/A'}</Box>,

            enableEditing: false,
            size: 200,
          },
          {
            accessorKey: 'projectName', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: 'autocomplete',
            Cell: ({ cell }) => <Box>{cell.getValue<string>() || 'N/A'}</Box>,
            enableEditing: false,

            header: 'Project Name',
            size: 150,
          },
        ],
      },
      {
        id: 'id',
        header: 'Job Info',
        columns: [
          {
            accessorKey: 'salary',
            size: 100,

            header: 'Salary',
            enableEditing: true,
            Cell: ({ cell }) => (
              <Box
                component="span"
                sx={(theme) => ({
                  backgroundColor:
                    cell.getValue<number>() < 50_000
                      ? theme.palette.error.dark
                      : cell.getValue<number>() >= 50_000 && cell.getValue<number>() < 75_000
                      ? theme.palette.warning.dark
                      : theme.palette.success.dark,
                  borderRadius: '0.25rem',
                  color: '#fff',
                  maxWidth: '9ch',
                  p: '0.25rem',
                })}
              >
                {cell.getValue<number>()?.toLocaleString?.('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </Box>
            ),
            filterFn: 'between', // default (or between)
          },
          {
            accessorFn: (row) => new Date(row.startDate), //convert to Date for sorting and filtering
            id: 'startDate',
            header: 'Start Date',
            filterVariant: 'date',
            enableEditing: false,
            filterFn: 'lessThan',
            sortingFn: 'datetime',
            Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(), //render Date as a string
            Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
            muiFilterTextFieldProps: {
              sx: {
                minWidth: '250px',
              },
            },
          },
        ],
      },
    ],
    [],
  );
};
