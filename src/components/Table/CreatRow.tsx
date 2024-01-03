import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { MRT_EditActionButtons, MRT_Row, MRT_RowData, MRT_TableInstance } from 'material-react-table';
import React from 'react';
import { IDev } from '../../types/devs';
type ICreateRow<T extends MRT_RowData> = {
  table: MRT_TableInstance<T>;
  row: MRT_Row<T>;
  internalEditComponents: React.ReactNode[];
};
function CreatRow<T extends MRT_RowData>({ table, row, internalEditComponents }: ICreateRow<T>) {
  return (
    <>
      <DialogTitle variant="h3">Create New User</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {internalEditComponents} {/* or render custom edit components here */}
      </DialogContent>
      <DialogActions>
        <MRT_EditActionButtons variant="text" table={table as MRT_TableInstance<MRT_RowData>} row={row as MRT_Row<MRT_RowData>} />
      </DialogActions>
    </>
  );
}

export default CreatRow;
