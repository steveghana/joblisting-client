import React, { useEffect, useRef } from 'react';
import { useClientColums } from '../../../../hooks/useColumns';
import {
  // IColumnTypeString,
  handleCreate,
  handleSave,
} from '../../../../utils/clientTableCrud';
import TableActions from '../../../../components/Table/TableActions';
import CreatRow from '../../../../components/Table/CreatRow';
import { MRT_ColumnDef, MaterialReactTable, useMaterialReactTable } from 'material-react-table';
//Material UI Imports
import { IClient } from '../../../../types/client';
import { useNavigate } from 'react-router';
import { getDefaultMRTOptions } from '../../../../components/Table/DefaultColumnOpt';
import { useUpdateClientMutation, useDeletClientMutation, useGetClientsQuery } from '../../../../store/services/client.service';
import { toast } from 'react-toastify';
import { useMediaQuery, useTheme } from '@mui/material';
import TopToolbar from '@/components/Table/topToolBar';
interface IClientTableData {
  data: IClient[];
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  refetch: () => void;
  columns: MRT_ColumnDef<IClient>[];
}
const ClientTableData = ({ data, isLoading, isFetching, isError, refetch, columns }: IClientTableData) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const [validationErrors, setValidationErrors] = React.useState<Record<string, string | undefined>>({});
  const navigate = useNavigate();
  const [updateUser, { isLoading: isUpdatingUser }] = useUpdateClientMutation();
  const [deleteuser, { isLoading: isDeletingUser }] = useDeletClientMutation();
  const defaultMRTOptions = getDefaultMRTOptions<IClient>(matchUpMd);
  const table = useMaterialReactTable({
    ...defaultMRTOptions,
    columns,
    // data,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    // editDisplayMode: 'row',

    getRowId: (row) => row.id as string,
    muiToolbarAlertBannerProps: isError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
    muiSearchTextFieldProps: {
      size: 'small',
      variant: 'outlined',
    },
    muiTableBodyCellProps: ({ row }) => ({
      onClick: (event) => {
        event.stopPropagation();
        navigate(`/dashboard/customers/clients/${row.id}`);
      },
      sx: {
        cursor: 'pointer', //you might want to change the cursor too when adding an onClick
      },
    }),
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: (item) => handleCreate(item, null, setValidationErrors),
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: ({ values, table, row }) =>
      handleSave(
        { data: { companyName: values.companyName, phoneNumber: values.phoneNumber }, id: values.id },
        { table, row },
        updateUser,
        setValidationErrors,
      ),
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <CreatRow internalEditComponents={internalEditComponents} row={row} table={table} />
    ),
    renderRowActions: ({ row, table }) => (
      <>
        <TableActions
          row={row}
          table={table}
          actionFn={async () => {
            const roleIds = row.original?.roles!.map((role) => role.id) as string[];
            const response = await deleteuser({
              id: row.original.id as string,
              roleIds,
            }).unwrap();
            if (response) {
              refetch();
              toast.success('Action Successful', {
                position: 'bottom-center',
              });
            }
          }}
        />
      </>
    ),

    // renderTopToolbar: ({ table }) => <TopToolbar table={table} />,
    state: {
      isLoading: isLoading || isUpdatingUser || isDeletingUser,
      isSaving: isUpdatingUser || isDeletingUser,
      showAlertBanner: isError,
      showProgressBars: isFetching || isLoading || isUpdatingUser || isDeletingUser,
    },
  });
  return <MaterialReactTable table={table} />;
};

export default ClientTableData;
