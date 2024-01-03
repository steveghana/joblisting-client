// NewJobForm.tsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, Grid } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import RoleInfo from './clientForm/addtionallInfo';
import { useAddJobMutation } from '../../../../store/services/role.service';
import { toast } from 'react-toastify';
import { themePalette } from '@/themes/schemes/palette';

interface NewJobFormProps {
  open: boolean;
  onClose: () => void;
  roleId: string;
}

const NewJobForm: React.FC<NewJobFormProps> = ({ open, onClose, roleId }) => {
  const [createJob, { isLoading }] = useAddJobMutation();

  const handleSubmit = async (values: any) => {
    try {
      const response = await createJob({ ...values, roleId }).unwrap();
      if (!isLoading && response) {
        toast.success('Job Added Successfully', {
          position: 'bottom-center',
        });
        onClose();
      }
    } catch (error) {
      toast.error('Error submitting data', {
        position: 'bottom-center',
      });
      return error;
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ background: themePalette.warning.light }}>Add New Job</DialogTitle>

      <PerfectScrollbar
        component="div"
        style={{
          height: 'calc(100vh - 88px)',
          paddingLeft: '16px',
          paddingRight: '16px',
        }}
      >
        <Grid container sx={{ minWidth: '35dvw', p: 1 }}>
          <RoleInfo atClientPage={true} handleExternalSubmit={(values) => handleSubmit(values)} />
        </Grid>
      </PerfectScrollbar>
    </Dialog>
  );
};

export default NewJobForm;
