import { MRT_Row } from 'material-react-table';
import { useState } from 'react';

export const useDialog = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});

  const handleOpen = (rowData: MRT_Row<any>) => {
    setData(rowData);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return {
    open,
    handleOpen,
    handleClose,
    data,
  };
};
