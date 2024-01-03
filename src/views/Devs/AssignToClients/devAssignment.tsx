// DeveloperAssignmentForm.tsx
import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Box,
  Modal,
  FormControl,
  Stack,
  InputLabel,
  IconButton,
  MenuItem,
  Avatar,
  Select,
  FormHelperText,
  Tooltip,
} from '@mui/material';
import * as Yup from 'yup';

import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik';
import CustomButton from '@/components/button';
import SubCard from '@/components/SubCard';
import { Close, EditTwoTone } from '@mui/icons-material';
import { themePalette } from '@/themes/schemes/palette';
import AlertDialog from '@/components/Dialog';
import { clients, getJobOptions, getRoleOptions, jobs, roles } from './dummydata';
import { useGetClientsQuery } from '@/store/services/client.service';
import { IClient } from '@/types/client';

interface DeveloperAssignmentFormProps {
  onSubmit: (data: DeveloperAssignmentFormData) => Promise<boolean>;
  open: boolean;
  setDialogOpen: (value: React.SetStateAction<boolean>) => void;
}

export interface DeveloperAssignmentFormData {
  client: { name: string; id: string };
  role: { name: string; id: string };
  job: { name: string; id: string };
}
const validationSchema = Yup.object({
  client: Yup.object({
    id: Yup.string().required('Client is required before selection role or jobs'),
  }),
  role: Yup.object({
    name: Yup.string().required('Role is required'),
  }),
  job: Yup.object({
    id: Yup.string().required('Job is required'),
  }),
});
const DeveloperAssignmentForm: React.FC<DeveloperAssignmentFormProps> = ({ onSubmit, open, setDialogOpen }) => {
  const { data, isLoading, isError } = useGetClientsQuery();
  const initialValues: DeveloperAssignmentFormData = {
    client: { name: '', id: '' },
    role: { name: '', id: '' },
    job: { name: '', id: '' },
  };
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [formData, setFormData] = useState<DeveloperAssignmentFormData>(initialValues);
  const handleSubmit = (values: DeveloperAssignmentFormData) => {
    setFormData(values);
    setConfirmationDialogOpen(true);
  };
  const handleConfirmAssignment = async () => {
    setConfirmationDialogOpen(false);
    const submited = await onSubmit(formData);
    if (submited) {
      setDialogOpen(false);
    }
  };
  return (
    <>
      <AlertDialog
        open={isConfirmationDialogOpen}
        handleClose={() => setConfirmationDialogOpen(false)}
        deleteFn={() => handleConfirmAssignment()} // TODO: Change prop to actionFn instead of deleteFn
      />
      <Modal open={open} onClose={() => setDialogOpen(false)} aria-labelledby="form-dialog-title">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: { lg: 600, md: 600, sm: 450, xs: 350 },
            // width: 600,
            bgcolor: 'white',
            outline: 0,
            borderRadius: 4,
          }}
        >
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting, handleChange, values, setFieldValue, isValidating }) => (
              <Form>
                <Box
                  sx={{
                    display: 'flex',
                    //   justifyContent: 'space-between',
                    gap: 1,
                    alignItems: 'center',
                    px: 1,
                    py: 2,
                    background: themePalette.warning.light,
                  }}
                >
                  <Typography sx={{ mx: 'auto' }} variant="h4" gutterBottom>
                    Assign Dev to Role/Client
                  </Typography>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => setDialogOpen(false)}>
                      <Close fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                <SubCard sx={{ p: 2 }}>
                  <Stack spacing={2}>
                    <FormControl margin="normal">
                      <InputLabel>Select Client</InputLabel>
                      <Field
                        name="client"
                        as={Select}
                        variant="outlined"
                        required
                        fullWidth
                        onChange={(e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
                          const selectedClient = data?.find((client) => client.name === e.target.value);
                          setFieldValue('client', { name: e.target.value as string, id: selectedClient?.id });
                        }}
                        value={values.client?.name}
                      >
                        {data?.map((client) => (
                          <MenuItem key={client.id} value={`${client.name}`} data-id={client.id}>
                            <Box display={'flex'} alignItems={'center'} gap={1}>
                              <Avatar sx={{ width: 30, height: 30 }} src={client.avatar || ''} />{' '}
                              <Box>
                                <Typography variant="subtitle2" noWrap>
                                  {client?.name}
                                </Typography>
                                <Typography variant="caption">{client?.companyName}</Typography>
                              </Box>
                            </Box>
                          </MenuItem>
                        ))}
                      </Field>

                      <ErrorMessage name="client" component="div">
                        {(msg: any) => (
                          <FormHelperText error variant="filled">
                            {`${msg.id}`}
                          </FormHelperText>
                        )}
                      </ErrorMessage>
                    </FormControl>
                    <FormControl margin="normal">
                      <InputLabel>Select Role</InputLabel>
                      <Field
                        name="role"
                        as={Select}
                        onChange={(e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
                          const selectedRole = getRoleOptions(
                            values.client.id,
                            data?.find((client) => client.id === values.client.id) as IClient,
                          )?.find((role) => role.title === e.target.value);
                          setFieldValue('role', { name: e.target.value as string, id: selectedRole?.id });
                        }}
                        disabled={!getRoleOptions(values.client.id, data?.find((client) => client.id === values.client.id) as IClient)?.length}
                        variant="outlined"
                        required
                        fullWidth
                        value={values?.role?.name}
                      >
                        {getRoleOptions(values.client.id, data?.find((client) => client.id === values.client.id) as IClient)?.map((role) => (
                          <MenuItem key={role.id} value={`${role?.title}`} data-id={role.id}>
                            <Box display={'flex'} alignItems={'center'} gap={1}>
                              <Box>
                                <Typography variant="subtitle2" noWrap>
                                  {role.title}
                                </Typography>
                                <Typography variant="caption">
                                  {role.aboutTheProject.length > 20 ? `${role.aboutTheProject.slice(0, 20)}...` : role.aboutTheProject}
                                </Typography>
                              </Box>
                            </Box>
                          </MenuItem>
                        ))}
                      </Field>
                      <ErrorMessage name="roleId" component="div">
                        {(msg) => (
                          <FormHelperText error variant="filled">
                            {msg}
                          </FormHelperText>
                        )}
                      </ErrorMessage>
                    </FormControl>
                    <FormControl margin="normal">
                      <InputLabel>Select Job</InputLabel>
                      <Field
                        name="job"
                        as={Select}
                        variant="outlined"
                        onChange={(e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
                          const role = getJobOptions(values.role.id, data?.find((client) => client.id === values.client.id) as IClient).find(
                            (job) => job.roleName === e.target.value,
                          );
                          setFieldValue('job', { name: e.target.value as string, id: role?.id });
                        }}
                        disabled={!getJobOptions(values.role.id, data?.find((client) => client.id === values.client.id) as IClient).length}
                        required
                        fullWidth
                        value={values.job.name}
                      >
                        {getJobOptions(values.role.id, data?.find((client) => client.id === values.client.id) as IClient)?.map((job) => (
                          <MenuItem value={job.roleName} key={job.id} data-id={job.id}>
                            <Box display={'flex'} alignItems={'center'} gap={1}>
                              <Box display={'flex'} alignItems={'flex-start'} flexDirection={'column'}>
                                <Typography variant="caption">{job.roleName}</Typography>
                                <Typography variant="caption">
                                  {job.description.length > 30 ? `${job.description.slice(0, 30)}...` : job.description}
                                </Typography>
                              </Box>
                            </Box>
                          </MenuItem>
                        ))}
                      </Field>
                      <ErrorMessage name="jobId" component="div">
                        {(msg) => (
                          <FormHelperText error variant="filled">
                            {msg}
                          </FormHelperText>
                        )}
                      </ErrorMessage>
                    </FormControl>
                    <Grid item alignSelf={'center'} lg={12} xs={12}>
                      <CustomButton fullWidth startIcon={<EditTwoTone />} type="submit">
                        Assign Developer
                      </CustomButton>
                    </Grid>
                  </Stack>
                </SubCard>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default DeveloperAssignmentForm;
