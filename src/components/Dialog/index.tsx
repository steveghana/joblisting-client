import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Close, LockOutlined, ThumbDown, ThumbUp } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import CustomButton from '../button';
import { MRT_Row } from 'material-react-table';
type IAlert<T> = {
  open: boolean;
  handleClose: () => void;
  deleteFn?: () => void; // TODO: Change prop to actionFn instead of deleteFn
};
export default function AlertDialog<T>({ handleClose, open, deleteFn }: IAlert<T>) {
  const proceed = () => {
    deleteFn && deleteFn();
    handleClose();
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle display={'flex'} alignItems={'center'} position={'relative'}>
          <Grid display={'flex'} flexDirection={'column'} alignItems={'center'} mx={'auto'}>
            <LockOutlined color="warning" />
            <Typography variant="h6" fontWeight={700}>
              Caution
            </Typography>
          </Grid>
          <IconButton
            sx={{ position: 'absolute', top: 1, right: 0 }}
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText component={'header'} id="alert-dialog-description" sx={{ textAlign: 'center' }}>
            <Typography>Are you sure you want to perform this action.</Typography>
            <Typography>Action taken might not be reversible</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: 'flex' }}>
          <Grid
            sx={{
              display: 'flex',
              mx: 'auto',
              alignSelf: 'center',
              gap: 1,
            }}
          >
            <CustomButton
              text="Disagree"
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              variant="outlined"
              endIcon={<ThumbDown fontSize="small" />}
            />
            <CustomButton
              text="Agree"
              autoFocus
              onClick={(e) => {
                e.stopPropagation();
                proceed();
              }}
              endIcon={<ThumbUp fontSize="small" />}
            />
          </Grid>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
