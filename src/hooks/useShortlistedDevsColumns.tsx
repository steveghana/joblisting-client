import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { IDev } from '../types/devs';
import { Avatar, Box } from '@mui/material';
import { getRandomColor } from '@/utils/generateRandomColors';
export const appliacantState = ['Pending', 'Accepted'];
export const useDevsShortlistedColums = () => {
  return useMemo<MRT_ColumnDef<IDev>[]>(
    () => [
      {
        id: 'employee', //id used to define `group` column
        header: 'Applicant',
        columns: [
          {
            accessorFn: (row) => `${row.firstName} ${row.lastName}`, //accessorFn used to join multiple data into a single cell
            id: 'name', //id is still required when using accessorFn instead of accessorKey
            header: 'Name',
            enableEditing: false,
            enableClickToCopy: true,

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
            accessorKey: 'rolestatus',
            filterVariant: 'select',
            editVariant: 'select',
            editSelectOptions: appliacantState,
            // enableEditing: false,

            // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
            // filterFn: "between",
            header: 'Status',
            size: 100,
            //custom conditional format and styling
            Cell: ({ cell }) => (
              <Box
                component="span"
                sx={(theme) => ({
                  backgroundColor:
                    cell.getValue<string>() === 'Pending'
                      ? theme.palette.info.dark
                      : cell.getValue<string>() === 'Interviewing'
                      ? theme.palette.info.light
                      : theme.palette.success.dark,

                  borderRadius: '0.25rem',
                  color: '#fff',
                  maxWidth: '9ch',
                  p: '0.25rem',
                })}
              >
                {cell.getValue<string>()}
              </Box>
            ),
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
            id: 'experince',
            accessorKey: 'experience', //hey a simple column for once
            header: 'Experience',
            enableEditing: false,
            size: 100,
          },
          {
            id: 'companyName',
            accessorKey: 'companyName', //hey a simple column for once
            header: 'Company Name',
            enableEditing: false,
            size: 150,
          },
          {
            accessorKey: 'projectName', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: 'autocomplete',
            enableEditing: false,

            header: 'Project Name',
            size: 150,
          },
        ],
      },
    ],
    [],
  );
};
