import { MRT_Row, MRT_RowData, MRT_TableInstance } from 'material-react-table';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit, People } from '@mui/icons-material';
import CustomButton from '../button';
import AlertDialog from '../Dialog';
import React from 'react';

interface IActionsProps<T extends MRT_RowData> {
  row: MRT_Row<T>;
  table: MRT_TableInstance<T>;
  isDetails?: boolean;
  tableType?: 'Shortlist' | 'Interviewing' | 'Accepted';

  actionFn: (items: any) => void;
  handleOpenJobForm?: (id: string) => void;
  cancelInterview?: () => void;
  assignToRole?: () => void;
  handleOpenInterviewForm?: (id: string) => void;
}

const TableActions = <T extends MRT_RowData>({
  row,
  table,
  actionFn,
  cancelInterview,
  assignToRole,
  handleOpenJobForm,
  handleOpenInterviewForm,
  tableType,
  isDetails,
}: IActionsProps<T>) => {
  const [open, setOpen] = React.useState(false);

  const [actionIndex, setActionIndex] = React.useState<any>({});

  const handleDialogOpen = (actionData?: any) => {
    setOpen(true);
    setActionIndex({ ...actionData });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AlertDialog deleteFn={() => actionFn(actionIndex.id)} handleClose={handleClose} open={open} />

      <Box sx={{ display: 'flex', gap: '.2rem' }}>
        {tableType === 'Shortlist' && (
          <Tooltip title="Schedule Interview">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleOpenInterviewForm && handleOpenInterviewForm(row.id);
              }}
            >
              <CustomButton sx={{ my: 2 }} variant="contained" text="Interview" />
            </IconButton>
          </Tooltip>
        )}

        {tableType === 'Interviewing' && (
          <Tooltip title="Cancel Interview">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                cancelInterview && cancelInterview();
              }}
            >
              <CustomButton sx={{ my: 2 }} variant="contained" text="cancel" />
            </IconButton>
          </Tooltip>
        )}

        {isDetails && (
          <Tooltip title="add new job">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleOpenJobForm && handleOpenJobForm(row.id);
              }}
            >
              <CustomButton sx={{ my: 2 }} variant="contained" text="Add Job" />
            </IconButton>
          </Tooltip>
        )}

        <Box display={'flex'} justifyContent={'space-between'}>
          <Tooltip title="Edit">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                table.setEditingRow(row);
              }}
            >
              <Edit />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton
              color="error"
              onClick={(e) => {
                e.stopPropagation();
                handleDialogOpen(row.original);
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </>
  );
};

export default TableActions;
