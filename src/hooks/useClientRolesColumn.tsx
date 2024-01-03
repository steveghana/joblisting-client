import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { Avatar, Box } from '@mui/material';
import { IRoleData } from '../types/roles';
import { communicationOptions, whenToStart } from '../lib/data/formFieldData';
import { experienceLevel } from '../lib/data/data';
export const useClientRolesColumn = () => {
  return useMemo<MRT_ColumnDef<IRoleData>[]>(
    () => [
      {
        id: 'employee', //id used to define `group` column
        header: 'Role Info',
        columns: [
          {
            accessorFn: (row) => `${row.title}`, //accessorFn used to join multiple data into a single cell
            id: 'title', //id is still required when using accessorFn instead of accessorKey
            header: 'Title',
            enableEditing: true,

            size: 50,
          },
          {
            accessorKey: 'communicationPreferences', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            enableEditing: true,
            editVariant: 'select',
            editSelectOptions: communicationOptions.map((item) => item.label),

            filterVariant: 'autocomplete',
            header: 'Comm. Type',
            size: 50,
          },
          {
            id: 'methodology',
            accessorKey: 'methodology', //hey a simple column for once
            header: 'Methodology',

            enableEditing: true,
            size: 50,
          },
          // {
          //   id: "whentostart",
          //   accessorKey: "whenToStart", //hey a simple column for once
          //   header: "When To Start",
          //   editVariant: "select",
          //   editSelectOptions: whenToStart.map((item) => item.label),

          //   enableEditing: true,
          //   size: 200,
          // },
          {
            accessorKey: 'experience', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: 'autocomplete',
            enableEditing: true,
            editVariant: 'select',
            editSelectOptions: experienceLevel.map((level) => level.label),

            header: 'Exp Required',
            size: 50,
          },
        ],
      },
      {
        id: 'id',
        header: 'Job Info',
        columns: [
          {
            accessorKey: 'vacancy_status',
            // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
            filterFn: 'between',
            header: 'Vacancy Status',
            enableEditing: true,
            editVariant: 'select',
            editSelectOptions: ['Open', 'Closed'],
            size: 50,
            //custom conditional format and styling
            Cell: ({ cell }) => (
              <Box
                component="span"
                sx={(theme) => ({
                  backgroundColor: cell.getValue<string>() === 'Closed' ? theme.palette.action.disabled : theme.palette.success.light,

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

          //  {
          //    accessorFn: (row) => new Date(row.startDate), //convert to Date for sorting and filtering
          //    id: "startDate",
          //    header: "Start Date",
          //    enableEditing: false,

          //    filterVariant: "date",
          //    filterFn: "lessThan",
          //    sortingFn: "datetime",
          //    Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(), //render Date as a string
          //    Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
          //    muiFilterTextFieldProps: {
          //      sx: {
          //        minWidth: "250px",
          //      },
          //    },
          //  },
        ],
      },
    ],
    [],
  );
};
