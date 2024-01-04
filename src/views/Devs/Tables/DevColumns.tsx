import React from 'react';

import {
  // IColumnTypeString,
  handleCreate,
  handleSave,
} from '../../../utils/clientTableCrud';
import TableActions from '../../../components/Table/TableActions';
import TopToolbar from '../../../components/Table/topToolBar';
import CreatRow from '../../../components/Table/CreatRow';
import { MRT_ColumnDef, MRT_Row, MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Button, useMediaQuery, useTheme } from '@mui/material';
// import { data } from "../../lib/data/data";
import { IDev } from '../../../types/devs';
import { useNavigate } from 'react-router';
import { getDefaultMRTOptions } from '../../../components/Table/DefaultColumnOpt';
import { useAddDevMutation, useBulkdeletDevMutation, useDeletDevMutation, useUpdateDevMutation } from '../../../store/services/dev.service';
import { toast } from 'react-toastify';
import { useDeletInterviewMutation } from '../../../store/services/interview.service';
type IDevTableData = {
  devs: IDev[];
  isLoading: boolean;
  isFetching: boolean;
  tableType?: string;
  isError: boolean;
  refetch: () => void;
  handleOpenInterviewForm?: (id: string) => void;
  columns: MRT_ColumnDef<IDev>[];
  // omitTypes: string;
};
const DevTableData = ({ devs, isLoading, isFetching, tableType, handleOpenInterviewForm, isError, columns, refetch }: IDevTableData) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const [validationErrors, setValidationErrors] = React.useState<Record<string, string | undefined>>({});
  const [createUser, { isLoading: isCreatingDev }] = useAddDevMutation();
  const [cancelInterview, { isLoading: isDeleting }] = useDeletInterviewMutation();
  const [updateUser, { isError: isUpdatingError, isLoading: isUpdatingDev, error: updateError }] = useUpdateDevMutation();
  const [deleteDev, { isError: isDeletingError, isLoading: isDeletingDev, error: deleteError }] = useDeletDevMutation();
  const [bulkdeleteuser, { isError: isBulkDeletingError, isLoading: isBulkDeletingDev, error: bulkdeleteError }] = useBulkdeletDevMutation();
  async function cancelinterviewFn(row: MRT_Row<IDev>) {
    console.log('canceling the interview');
    try {
      const canceld = await cancelInterview({
        id: row.original.candidatInterview!.id as string,
      }).unwrap();
      if (canceld) {
        toast.warn('Interview Canceled', {
          position: 'bottom-center',
        });
        refetch();
      }
    } catch (err) {
      // toast.error('Couldnt cancel interview', {
      //   position: 'bottom-center',
      // });
    }
  }
  async function DeletDevFn(row: MRT_Row<IDev>) {
    const asGuest = row.original?.guestInterview?.filter((guest) => guest?.guests?.map((guest) => guest.id));

    console.log(asGuest, row.original, 'guest');
    const asCandidate = row.original?.candidatInterview?.candidate?.id === row.original!.id;
    if (asGuest?.length || asCandidate) {
      toast.warning('Cannot delete this developer as he is already interviewing', {
        position: 'bottom-center',
      });
      return;
    }
    try {
      const response = await deleteDev({
        id: row.original.id as string,
      }).unwrap();
      if (response) {
        toast.success('Action Successful', {
          position: 'bottom-center',
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  const navigate = useNavigate();
  const defaultMRTOptions = getDefaultMRTOptions<IDev>(matchUpMd);
  const table = useMaterialReactTable({
    ...defaultMRTOptions,
    columns,
    // data,
    data: devs, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    editDisplayMode: 'row',

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
        if (tableType) {
          return;
        }
        event.stopPropagation();
        navigate(`/management/profile/details/${row.original.userId}`);
      },
      sx: {
        cursor: 'pointer', //you might want to change the cursor too when adding an onClick
      },
    }),

    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: (item) => handleCreate(item, createUser, setValidationErrors),
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: ({ values, table, row }) => {
      console.log(values, 'thisdlfjdvalues');
      handleSave({ salary: values.salary || 0, role_status: values.rolestatus }, { table, row }, updateUser, setValidationErrors);
    },

    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <CreatRow internalEditComponents={internalEditComponents} row={row} table={table} />
    ),
    // renderDetailPanel: ({ row }) => <TableDetail row={row} />,
    renderRowActions: ({ row, table }) => (
      <>
        <TableActions
          cancelInterview={async () => await cancelinterviewFn(row)}
          // disabled={isDeleting || isUpdatingDev || isCreatingDev}
          assignToRole={async () => await DeletDevFn(row)}
          tableType={row.original.rolestatus === 'Interviewing' ? 'Interviewing' : row.original.rolestatus === 'Pending' ? 'Shortlist' : 'Accepted'}
          handleOpenInterviewForm={(id: string) => handleOpenInterviewForm && handleOpenInterviewForm(id)}
          actionFn={async () => DeletDevFn(row)}
          row={row}
          table={table}
        />
      </>
    ),

    // renderRowActionMenuItems: ({ closeMenu }) => [
    //   ["View Profile", "Send Email"].map((action, index) => (
    //     <RowAction
    //       actionString={action}
    //       key={index}
    //       close={() => closeMenu()}
    //     />
    //   )),
    // ],

    renderTopToolbar: ({ table }) => (
      <TopToolbar
        refresh={() => refetch()}
        table={table}
        takeBulkAction={async (id) => {
          const response = await bulkdeleteuser({ id }).unwrap();
          if (response && !isBulkDeletingError) {
            toast.success('Action Successful', {
              position: 'bottom-center',
            });
          }
        }}
      />
    ),
    state: {
      isLoading: isLoading || isDeletingDev || isBulkDeletingDev || isDeleting || isUpdatingDev,
      isSaving: isCreatingDev || isUpdatingDev || isDeletingDev || isBulkDeletingDev || isDeleting,
      showAlertBanner: isError || isBulkDeletingError,
      showProgressBars: isFetching,
    },
  });

  return <MaterialReactTable table={table} />;
};

export default DevTableData;
