// GmailComposer.tsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  TextField,
  Chip,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Autocomplete,
  Paper,
  Stack,
  Typography,
  createFilterOptions,
  Avatar,
  Grid,
  FormControl,
  FormHelperText,
} from '@mui/material';
import * as Yup from 'yup';

import { Close, Send } from '@mui/icons-material';
import { themePalette } from '@/themes/schemes/palette';
import CustomButton from '../button';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { options } from 'numeral';
import { validateUser } from '@/utils/tablevalidate';
import { useParams } from 'react-router';
import axios from 'axios';
import _api_url from '@/api/_api_url';
import { toast } from 'react-toastify';
interface Recipient {
  email: string;
  name: string;
}
export interface SimpleDialogProps {
  open: boolean;
  setDialogOpen: (value: React.SetStateAction<boolean>) => void;
  reciepients: Recipient[];
}
const validationSchema = Yup.object({
  recipients: Yup.array().min(1, 'At least one recipient is required'),

  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('message is required'),

  // Add other validation rules for other fields if needed
});
const ComposeEmail = (props: SimpleDialogProps) => {
  const filter = createFilterOptions<Recipient>();
  const { id } = useParams();
  return (
    <Modal open={props.open} onClose={() => props.setDialogOpen(false)} aria-labelledby="form-dialog-title">
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
        <Formik
          initialValues={{ subject: '', message: '', recipients: id ? [...props.reciepients] : [] }}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            try {
              const url = _api_url.getApiUrl() + '/contact';
              const response = await axios.post(url, {
                subject: values.subject,
                message: values.message,
                recipients: values.recipients,
              });
              if (response.statusText.toLowerCase() === 'ok') {
                toast.success('Message sent successfully', { position: 'bottom-center' });
                props.setDialogOpen(false);
                actions.setSubmitting(false);
              } else {
                toast.error('Couldnt send message', { position: 'bottom-center' });
              }
            } catch (error) {
              toast.error('Something went wrong, couldnt send message', { position: 'bottom-center' });
            }
          }}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 1,
                  alignItems: 'center',
                  p: 1,
                  background: themePalette.warning.light,
                }}
              >
                <Typography>New Message</Typography>
                <IconButton onClick={() => props.setDialogOpen(false)}>
                  <Close fontSize="small" />
                </IconButton>
              </Box>
              <Stack sx={{ px: 2, py: 1 }} spacing={1}>
                <FormControl fullWidth>
                  <Field
                    name="recipients"
                    render={({ field, form }: any) => (
                      <Autocomplete
                        {...field}
                        options={props.reciepients}
                        getOptionLabel={(option: Recipient) => option.name}
                        filterOptions={(options: any[], params) => filter(options, params)}
                        isOptionEqualToValue={(option: Recipient, value: Recipient) => option.email === value.email}
                        freeSolo
                        multiple
                        disabled={!!id}
                        onChange={(_event, newValue: Recipient[] | null, reason) => {
                          // Handle free text input or selected options
                          if (reason === 'selectOption' || reason === 'removeOption') {
                            form.setFieldValue(field.name, Array.isArray(newValue) ? newValue : [newValue]);
                          } else if (reason === 'createOption') {
                            let newValuelength = newValue?.length || 0;
                            let valueString = newValue![newValuelength - 1] as unknown as string;
                            const valueObj = {
                              email: valueString,
                              name: valueString,
                            };
                            form.setFieldValue(field.name, [...field.value, valueObj]);
                          }
                        }}
                        renderTags={(value: Recipient[], getTagProps) =>
                          value.map((option, index) => {
                            return <Chip label={typeof option === 'string' ? option : `${option.email}`} {...getTagProps({ index })} />;
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="To"
                            variant="standard"
                            style={{ marginBottom: '16px', border: 'none', outline: 'none' }}
                          />
                        )}
                        renderOption={(props, option, { inputValue }) => {
                          return (
                            <li {...props} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                              <Avatar sizes="small">{option.name ? option.name[0] : inputValue[0]}</Avatar>
                              <Grid container>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                  <Typography variant="body2" style={{ fontWeight: 600 }}>
                                    {option.name || inputValue}
                                  </Typography>
                                </Grid>
                                {option.email && (
                                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Typography variant="body2" style={{ fontWeight: 600 }}>
                                      {option.email}
                                    </Typography>
                                  </Grid>
                                )}
                              </Grid>
                            </li>
                          );
                        }}
                      />
                    )}
                  />
                  <ErrorMessage name="recipients" component="div">
                    {(msg) => (
                      <FormHelperText error variant="filled">
                        {msg}
                      </FormHelperText>
                    )}
                  </ErrorMessage>
                </FormControl>
                <FormControl fullWidth>
                  <Field
                    as={TextField}
                    variant="standard"
                    placeholder="Subject"
                    name="subject"
                    autoComplete="off"
                    InputProps={{ disableUnderline: true }}
                    fullWidth
                  />
                  <ErrorMessage name="subject" component="div">
                    {(msg) => (
                      <FormHelperText error variant="filled">
                        {msg}
                      </FormHelperText>
                    )}
                  </ErrorMessage>
                </FormControl>
                <FormControl fullWidth>
                  <Field
                    as={TextField}
                    placeholder="Message"
                    variant="standard"
                    name="message"
                    multiline
                    InputProps={{ disableUnderline: true }}
                    fullWidth
                    rows={8}
                  />

                  <ErrorMessage name="message" component="div">
                    {(msg) => (
                      <FormHelperText error variant="filled">
                        {msg}
                      </FormHelperText>
                    )}
                  </ErrorMessage>
                </FormControl>
                <CustomButton text="Send" type="submit" endIcon={<Send fontSize="small" />} />
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default ComposeEmail;
