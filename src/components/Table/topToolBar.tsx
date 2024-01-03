// TopToolbar.tsx
import React from 'react';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { lighten } from '@mui/system';
import { MRT_GlobalFilterTextField, MaterialReactTable, MRT_ToggleFiltersButton } from 'material-react-table';
import { Delete, Refresh } from '@mui/icons-material';
import AlertDialog from '../Dialog';

interface TopToolbarProps {
  table: any;
  refresh: () => void;
  takeBulkAction: (ids: string[]) => void; // Change 'any' to the type of your table data
  isDetails?: boolean;
  handleOpenJobForm?: (id: string) => void;
}

const TopToolbar: React.FC<TopToolbarProps> = ({ table, refresh, takeBulkAction, handleOpenJobForm }) => {
  const [open, setOpen] = React.useState(false);

  const [actionIndex, setActionIndex] = React.useState<any>({});

  const handleDialogOpen = (actionData?: any) => {
    setOpen(true);
    setActionIndex({ ...actionData });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const _handleTriggerBulkAction = () => {
    const ids = table.getSelectedRowModel().flatRows.map((row: any) => row.id);
    takeBulkAction(ids);
    table.resetRowSelection(true);
  };

  return (
    <>
      <AlertDialog deleteFn={_handleTriggerBulkAction} handleClose={handleClose} open={open} />
      <Box
        sx={(theme) => ({
          backgroundColor: lighten(theme.palette.background.default, 0.05),
          display: 'flex',
          gap: '0.5rem',
          p: '8px',
          justifyContent: 'space-between',
        })}
      >
        <Box>
          <Box sx={{ display: 'flex', gap: '0.5rem' }}>
            {(table.getIsSomeRowsSelected() || table.getIsSomePageRowsSelected() || table.getIsAllPageRowsSelected()) && (
              <Box display={'flex'} gap={1} alignItems={'center'}>
                <Typography variant="overline" fontWeight={700}>
                  Bulk delete
                </Typography>
                <Tooltip title="Delete">
                  <IconButton
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDialogOpen();
                    }}
                  >
                    <Delete fontSize="medium" />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Box>
          <Tooltip title="Refresh">
            <IconButton onClick={(e) => refresh()}>
              <Refresh />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <MRT_GlobalFilterTextField table={table} />
          <MRT_ToggleFiltersButton table={table} />
        </Box>
      </Box>
    </>
  );
};

export default TopToolbar;
