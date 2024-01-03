import React from 'react';
import DeveloperAssignmentForm, { DeveloperAssignmentFormData } from './devAssignment';
import { useAssignDevMutation, useUnassignDevMutation } from '@/store/services/dev.service';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
interface DeveloperAssignmentFormProps {
  open: boolean;
  setDialogOpen: (value: React.SetStateAction<boolean>) => void;
}

const AssignDevsToClient: React.FC<DeveloperAssignmentFormProps> = ({ open, setDialogOpen }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignDev, { isError, isLoading }] = useAssignDevMutation();
  const onSubmitDevToClient = async (value: DeveloperAssignmentFormData) => {
    try {
      const response = await assignDev({
        developerId: id as string,
        clientId: value.client.id,
        roleId: value.role.id,
        jobId: value.job.id,
      }).unwrap();
      if (response && !isError) {
        toast.success('Developer successfully assigned to role ' + value.role.name, {
          position: 'bottom-center',
        });
        setDialogOpen(false);
        navigate('/devs/all');
        return true;
      }
    } catch (error) {
      toast.error('Couldnt assign developer to role, please try again later', {
        position: 'bottom-center',
      });
    }
    return false;
  };
  console.log('entered');
  return (
    <div>
      <DeveloperAssignmentForm open={open} setDialogOpen={() => setDialogOpen(false)} onSubmit={(value) => onSubmitDevToClient(value)} />
    </div>
  );
};

export default AssignDevsToClient;
