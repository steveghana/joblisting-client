import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { Avatar, Box } from '@mui/material';
import { ApplicantsSubmission } from '../types/roles';
import { getRandomColor } from '@/utils/generateRandomColors';
export const appliacantState = [
  'PendingShortlist',
  'Shortlisted',
  'Rejected',
  // "Accepted",
];
type IApplicationProps = {
  setValidationErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  validationErrors: Record<string, string>;
};
export const useApplicantsColumns = () => {
  return useMemo<MRT_ColumnDef<ApplicantsSubmission>[]>(
    () => [
      {
        id: 'id',
        header: 'Application Status',
        columns: [
          {
            accessorKey: 'status',
            filterVariant: 'select',
            editVariant: 'select',
            editSelectOptions: appliacantState,
            muiEditTextFieldProps: {
              select: true,
              // error: !!validationErrors?.state,
              // helperText: validationErrors?.state,
            },
            // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
            // filterFn: "between",
            header: 'Status',
            size: 150,
            //custom conditional format and styling
            Cell: ({ cell }) => (
              <Box
                component="span"
                sx={(theme) => ({
                  backgroundColor:
                    cell.getValue<string>() === 'PendingShortlist'
                      ? theme.palette.warning.light
                      : cell.getValue<string>() === 'Rejected'
                      ? theme.palette.error.dark
                      : cell.getValue<string>() === 'Shortlisted'
                      ? theme.palette.info.dark
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

          // {
          //   accessorFn: (row) => new Date(row.startDate), //convert to Date for sorting and filtering
          //   id: "startDate",
          //   header: "Start Date",
          //   filterVariant: "date",
          //   filterFn: "lessThan",
          //   sortingFn: "datetime",
          //   Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(), //render Date as a string
          //   Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
          //   muiFilterTextFieldProps: {
          //     sx: {
          //       minWidth: "250px",
          //     },
          //   },
          // },
        ],
      },
      {
        id: 'employee', //id used to define `group` column
        header: 'Employee',
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
            accessorKey: 'years_of_experience', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            enableEditing: false,
            // filterVariant: "autocomplete",
            filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn

            header: 'Experience',
            size: 30,
          },
          {
            accessorKey: 'email', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            enableEditing: false,
            filterVariant: 'autocomplete',
            header: 'Email',
            size: 250,
          },
          {
            accessorKey: 'phoneNumber', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            enableEditing: false,
            filterVariant: 'autocomplete',
            header: 'Phone Number',
            size: 150,
          },
          {
            accessorKey: 'address', //hey a simple column for once
            header: 'Address',
            enableEditing: false,
            size: 250,
          },
        ],
      },
    ],
    [],
  );
};
