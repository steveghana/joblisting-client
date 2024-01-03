import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { IDev } from '../types/devs';
import { Avatar, Box } from '@mui/material';
import { AccountCircle, Send } from '@mui/icons-material';
import { IClient } from '../types/client';
import { validateEmail, validateRequired } from '../utils/tablevalidate';
import { IRoleData } from '../types/roles';
import { communicationOptions, whenToStart } from '../lib/data/formFieldData';
import { experienceLevel } from '../lib/data/data';
import { getRandomColor } from '@/utils/generateRandomColors';
export const useClientColums = () => {
  return useMemo<MRT_ColumnDef<IClient>[]>(
    () => [
      {
        id: 'client info', //id used to define `group` column
        header: 'Client Info',
        columns: [
          {
            accessorFn: (row) => `${row.name}`, //accessorFn used to join multiple data into a single cell
            id: 'name', //id is still required when using accessorFn instead of accessorKey
            header: 'Name',
            enableEditing: false,

            size: 250,
            Cell: ({ renderedCellValue, row: { original } }) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                {/* <Avatar sx={{}} /> */}
                <Avatar sx={{ backgroundColor: getRandomColor(), color: 'white', fontSize: '.85rem' }} src={original.avatar}>
                  {' '}
                  {!original.avatar && `${original.name[0]}`}
                </Avatar>
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: 'email', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            enableEditing: false,

            // filterVariant: 'autocomplete',
            header: 'Email',
            size: 150,
          },
          {
            accessorKey: 'phoneNumber', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,

            header: 'Phone Number',
            size: 150,
          },
          {
            accessorKey: 'countrylabel', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: 'autocomplete',
            enableEditing: false,

            header: 'Country',
            size: 150,
          },
          {
            accessorKey: 'developersLength', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: 'range',
            filterFn: 'between',
            enableEditing: false,

            header: ' Devs Assigned',
            size: 50,
          },
          {
            accessorKey: 'rolesOpen', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: 'range',
            enableEditing: false,

            header: 'Open Roles',
            size: 50,
          },
        ],
      },
      {
        id: 'id',
        header: 'Project Info',
        columns: [
          {
            accessorKey: 'companyName',
            filterVariant: 'autocomplete',

            // filterFn: 'between',
            header: 'Company Name',
            size: 200,
          },
          {
            accessorKey: 'projectTitle',
            filterVariant: 'autocomplete',
            enableEditing: false,

            //hey a simple column for once
            header: 'Project Title',
            size: 350,
          },
          {
            accessorFn: (row) => new Date(row.startDate), //convert to Date for sorting and filtering
            id: 'startDate',
            header: 'Start Date',
            filterVariant: 'date',
            filterFn: 'lessThan',
            enableEditing: false,

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

// type ClientColumnsType =
//   MRT_ColumnDef<IClient>[] /* specify the type returned by useClientColums */;
// type DevColumnsType =
//   MRT_ColumnDef<IDev>[] /* specify the type returned by useDevsColums */;

// export function useColumns(columnType: "Client" | "Dev") {
//   return columnType === "Client" ? useClientColums() : useDevsColums();
// }
