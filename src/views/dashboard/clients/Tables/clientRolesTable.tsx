import React, { useState } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import TableActions from '../../../../components/Table/TableActions';
import { IRoleData } from '../../../../types/roles';
import { handleSave } from '../../../../utils/clientTableCrud';
import { useBulkDeletRoleMutation, useDeletRoleMutation, useUpdateRoleMutation } from '../../../../store/services/role.service';
import { toast } from 'react-toastify';
import { IClient } from '../../../../types/client';
import TopToolbar from '../../../../components/Table/topToolBar';
import JobDetails from '../components/jobDetails';
import { useClientRolesColumn } from '../../../../hooks/useClientRolesColumn';

const ClientRoleTable = ({
  data,
  handleOpenJobForm,
  onActionComplete,
}: {
  data: { role: IRoleData[]; clientId: string };

  onActionComplete: () => void;

  handleOpenJobForm: (id: string) => void;
}) => {
  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});
  const [updateRole, { isLoading, isError }] = useUpdateRoleMutation();
  const [deleteRole, { isLoading: isDeleteLoading, isError: isDeleteError }] = useDeletRoleMutation();
  const [bulkdeleteuser, { isError: isBulkDeletingError, isLoading: isBulkDeleting }] = useBulkDeletRoleMutation();
  const columns = useClientRolesColumn();
  const table = useMaterialReactTable({
    columns,
    data: data.role,
    createDisplayMode: 'row', // ('modal', and 'custom' are also available)
    editDisplayMode: 'modal', // ('modal', 'row', 'table', and 'custom' are also available)
    enableEditing: true,
    enableRowActions: true,
    renderDetailPanel: ({ row }) => <JobDetails jobs={row.original.jobs} actionComplete={onActionComplete} />,

    getRowId: (row) => row.id as string,
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: () => {},
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: ({ values, table, row }) => {
      handleSave(values, { table, row }, updateRole, setValidationErrors);
      onActionComplete();
      //   refetch();
    },
    renderTopToolbar: ({ table }) => (
      <TopToolbar
        refresh={() => {}}
        table={table}
        takeBulkAction={async () => {
          // const response = await bulkdeleteuser({ id }).unwrap();
        }}
      />
    ),
    renderRowActions: ({ row, table }) => (
      <TableActions
        actionFn={async () => {
          try {
            const response = await deleteRole({ id: row.original.id as string }).unwrap();

            if (response) {
              onActionComplete();
              toast.success('Action Successful', {
                position: 'bottom-center',
              });
            }
          } catch (error) {
            toast.error('Couldnt delete role', {
              position: 'bottom-center',
            });
          }
        }}
        isDetails={true}
        handleOpenJobForm={() => handleOpenJobForm(row.id)}
        row={row}
        table={table}
      />
    ),
    state: {
      isLoading: isLoading || isDeleteLoading || isBulkDeleting,
      isSaving: isLoading || isDeleteLoading || isBulkDeleting,
      showAlertBanner: isError || isDeleteError || isBulkDeletingError,
      showProgressBars: isLoading || isDeleteLoading || isBulkDeleting,
    },
  });

  return <MaterialReactTable table={table} />;
};
export default ClientRoleTable;
