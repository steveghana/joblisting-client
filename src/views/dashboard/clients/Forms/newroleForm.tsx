// NewRoleForm.tsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, Grid } from '@mui/material';
import ProjectDetails from './clientForm/projectdetails';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useFormData } from '../../../../contexts/clientFormContext';
import { useAddRoleMutation } from '../../../../store/services/role.service';
import { toast } from 'react-toastify';
import { themePalette } from '@/themes/schemes/palette';

interface NewRoleFormProps {
  open: boolean;
  clientId: string;
  onClose: () => void;
}

const NewRoleForm: React.FC<NewRoleFormProps> = ({ open, onClose, clientId }) => {
  const initialValues = {
    title: '',
    devsNeeded: '',
    methodology: '',
    aboutTheProject: '',
    experience: '',
    communicationPreferences: '',
  };
  const { formDataState } = useFormData();
  const [createRole, { isLoading }] = useAddRoleMutation();

  const handleSubmit = async (values: (typeof formDataState)['Project Details']) => {
    try {
      const response = await createRole({ ...values, clientId }).unwrap();
      if (!isLoading && response) {
        toast.success('Role Added Successfully', {
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
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ background: themePalette.warning.light }}>Add New Role</DialogTitle>
      <PerfectScrollbar
        component="div"
        style={{
          //   height: "calc(100vh - 88px)",
          paddingLeft: '16px',
          paddingRight: '16px',
        }}
      >
        {/* <DialogContent sx={{ minWidth: '50%' }}> */}
        <Grid container sx={{ p: 1, minWidth: '35dvw' }}>
          <ProjectDetails atClientPage={true} handleExternalSubmit={(values) => handleSubmit(values)} />
        </Grid>
        {/* </DialogContent> */}
      </PerfectScrollbar>
    </Dialog>
  );
};

export default NewRoleForm;
