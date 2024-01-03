import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  Input,
  IconButton,
  FormControlLabel,
  Checkbox,
  Typography,
  Divider,
  Box,
  FormHelperText,
  Avatar,
  Tooltip,
} from '@mui/material';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import SubCard from '../../../components/SubCard';
import CustomButton from '../../../components/button';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router';
import RenderGroup from '../interviewSteps/Autocomplete';
import { ArrowBackTwoTone, Schedule } from '@mui/icons-material';
import AnimateButton from '../../../components/extended/AnimateButton';
import { DatePicker, TimeField, TimePicker } from '@mui/x-date-pickers';
import { startOfDay, addHours, addMinutes } from 'date-fns';
import { Iinterviews, InterviewFormValue } from '../../../types/interviews';
import { IDev } from '../../../types/devs';
import { Social } from '@/components/auth/auth-forms/authicons';

interface IinterviewsFields {
  guests: IDev[];
  _applicants: IDev[];
  isEditing: boolean;
  editableInterviewInfo: Iinterviews | null;
  handleEdit: (values: InterviewFormValue) => void;
  handleSubmit: (values: InterviewFormValue) => void;
}
const linkOrPhoneNumberSchema = Yup.string().test('linkOrPhoneNumber', 'Invalid link or phone number', (value) => {
  // Regular expression for validating a URL
  const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*([?&].*)?$/;

  // Regular expression for validating a phone number
  const phoneRegex = /^\+?\d{8,14}$/;

  // Check if the value matches either URL or phone number pattern
  return urlRegex.test(value as string) || phoneRegex.test(value as string);
});
const validationSchema = Yup.object({
  eventType: Yup.string().required('Eventytpe type is required'),
  candidate: Yup.string().required('Candidate is required'),
  eventLInk: linkOrPhoneNumberSchema.required('Please enter a valid link or phone number'),
});
const InterviewFormFields = ({ guests, _applicants, isEditing, editableInterviewInfo, handleEdit, handleSubmit }: IinterviewsFields) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meetingType, setMeetingType] = useState('');

  const initialValues: InterviewFormValue = {
    candidate: `${((id || isEditing) && _applicants[0]?.firstName) || ''} ${((id || isEditing) && _applicants[0]?.lastName) || ''}`,
    guests: [`${((isEditing || id) && guests[0]?.firstName) || 'No'} ${(isEditing || id) && guests[0]?.lastName}`],

    // candidate: "",
    eventType: editableInterviewInfo?.eventType || '',
    eventOption: editableInterviewInfo?.eventOption || '',
    description: editableInterviewInfo?.description || '',
    eventLInk: editableInterviewInfo?.eventLInk || '',
    starttime: new Date(),
    endtime: new Date(),
    startDate: addMinutes(addHours(startOfDay(new Date()), 15), 30),
    endDate: addMinutes(addHours(startOfDay(new Date()), 15), 30),
  };

  return (
    // lg
    <>
      <Divider sx={{ border: '1px solid rgba(128, 128, 128, 0.158)' }} />
      <Grid container>
        <Box display="flex" sx={{ background: 'white', width: '100%' }}>
          <Tooltip arrow placement="top" onClick={() => navigate('/devs/shortlisted')} title="Go back">
            <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
              <ArrowBackTwoTone />
              <Typography variant="subtitle1" sx={{ ml: 1 }}>
                Back
              </Typography>
            </IconButton>
          </Tooltip>
        </Box>
        <Box py={3} display={'flex'} sx={{ width: '100%' }} alignItems={'center'}>
          <Typography sx={{ mx: 'auto' }} variant="h4">
            {isEditing ? 'Edit' : 'Add'} One-on-One Event
          </Typography>
        </Box>

        <Formik initialValues={initialValues} onSubmit={isEditing ? handleEdit : handleSubmit} validationSchema={validationSchema}>
          {({ isSubmitting, handleChange, values, setFieldValue, isValidating }) => (
            <Form>
              <Paper
                style={{
                  border: '1px solid rgb(84, 84, 84)',
                  padding: '20px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom>
                      Event Info
                    </Typography>
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    {_applicants?.length > 0 && (
                      <FormControl fullWidth>
                        <InputLabel id="role-label">Select applicant</InputLabel>
                        <Field name="candidate" as={Select} disabled={!!id} variant="outlined" required fullWidth value={values.candidate}>
                          {_applicants.map((applicant) => (
                            <MenuItem key={applicant.id} value={`${applicant?.firstName} ${applicant?.lastName}`}>
                              <Box display={'flex'} alignItems={'center'} gap={1}>
                                <Avatar sx={{ width: 30, height: 30 }} src={applicant.avatar || ''} />{' '}
                                <Typography>{`${applicant.firstName} ${applicant.lastName}`}</Typography>
                              </Box>
                            </MenuItem>
                          ))}
                        </Field>
                        <ErrorMessage name="candidate" component="div">
                          {(msg) => (
                            <FormHelperText error variant="filled">
                              {msg}
                            </FormHelperText>
                          )}
                        </ErrorMessage>
                      </FormControl>
                    )}
                  </Grid>
                  {/* Event Info */}

                  <Grid item xs={12}>
                    {/* <Typography sx={{ mb: 2 }} variant="h5">
                      Choose Interviewer
                    </Typography> */}
                    <FormControl fullWidth>
                      <RenderGroup required label="Select Interviewer" name="guests" data={guests} value={values.guests} />
                      <ErrorMessage name="guests" component="div">
                        {(msg) => (
                          <FormHelperText error variant="filled">
                            {msg}
                          </FormHelperText>
                        )}
                      </ErrorMessage>
                    </FormControl>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="role-label">Select the Interview Type</InputLabel>
                      <Field name="eventType" as={Select} variant="outlined" fullWidth>
                        <MenuItem value="technical">Technical Interview</MenuItem>
                        <MenuItem value="behavioral">Behavioral Interview</MenuItem>
                        <MenuItem value="hr">HR Interview</MenuItem>
                      </Field>
                      <ErrorMessage name="eventType" component="div">
                        {(msg) => (
                          <FormHelperText error variant="filled">
                            {msg}
                          </FormHelperText>
                        )}
                      </ErrorMessage>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined" required>
                      <InputLabel htmlFor="eventOption">Location</InputLabel>
                      <Field
                        name="eventOption"
                        required
                        as={Select}
                        label="Location"
                        inputProps={{
                          name: 'eventOption',
                          id: 'eventOption',
                        }}
                        onChange={(e: { target: { value: any } }) => {
                          handleChange(e);
                          const changedValue = e.target.value;
                          setMeetingType(changedValue);
                        }}
                      >
                        <MenuItem value="">Add a location</MenuItem>
                        <MenuItem value="In-Person-meeting">In-person meeting</MenuItem>
                        <MenuItem value="Call">Phone call</MenuItem>
                        <MenuItem value="Google-meet">Google meet</MenuItem>
                        <MenuItem value="Zoom-call">Zoom</MenuItem>
                      </Field>
                      <ErrorMessage name="eventOption" component="div">
                        {(msg) => (
                          <FormHelperText error variant="filled">
                            {msg}
                          </FormHelperText>
                        )}
                      </ErrorMessage>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <Field
                        name="description"
                        as={TextField}
                        fullWidth
                        label="Description/Instructions"
                        variant="outlined"
                        multiline
                        rows={3}
                        required
                      />
                      <ErrorMessage name="description" component="div">
                        {(msg) => (
                          <FormHelperText error variant="filled">
                            {msg}
                          </FormHelperText>
                        )}
                      </ErrorMessage>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <Field
                        name="eventLInk"
                        as={TextField}
                        placeholder={'URL or Phone'}
                        required
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              {(values.eventOption === 'Zoom-call' || values.eventOption === 'Google-meet') && (
                                <Tooltip title={`Generate ${values.eventOption} link`}>
                                  <Button
                                    href={values.eventOption === 'Zoom-call' ? 'https://zoom.us' : 'https://meet.google.com/?pli=1'}
                                    target="_blank"
                                    // aria-label={`${key} login button`}
                                    // onClick={handler}
                                    // disabled={isLoading}
                                  >
                                    {React.createElement(Social[values.eventOption.split('-')[0]].icon)}
                                  </Button>
                                </Tooltip>
                              )}
                            </InputAdornment>
                          ),
                        }}
                        variant="outlined"
                        fullWidth
                      />
                      <ErrorMessage name="eventLInk" component="div">
                        {(msg) => (
                          <FormHelperText error variant="filled">
                            {msg}
                          </FormHelperText>
                        )}
                      </ErrorMessage>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <DemoItem label="Start meeting time">
                        {/* <TimePicker defaultValue={dayjs("2022-04-17T15:30")} 
                        /> */}
                        <Field
                          name="starttime"
                          as={TimePicker}
                          fullWidth
                          label="End meeting time"
                          type="time"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="outlined"
                          onChange={(date: any) => setFieldValue('starttime', date)}
                          renderInput={(
                            params: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLInputElement> & React.InputHTMLAttributes<HTMLInputElement>,
                          ) => <input {...params} />}
                        />
                      </DemoItem>
                      <ErrorMessage name="starttime" component="div">
                        {(msg) => (
                          <FormHelperText error variant="filled">
                            {msg}
                          </FormHelperText>
                        )}
                      </ErrorMessage>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <DemoItem label="End meeting time">
                        {/* <TimePicker defaultValue={dayjs("2022-04-17T15:30")} 
                        /> */}
                        <Field
                          name="endtime"
                          as={TimePicker}
                          fullWidth
                          defaultValue={addMinutes(addHours(startOfDay(new Date()), 15), 30)}
                          label="End meeting time"
                          type="time"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="outlined"
                          onChange={(date: any) => setFieldValue('endtime', date)}
                          renderInput={(
                            params: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLInputElement> & React.InputHTMLAttributes<HTMLInputElement>,
                          ) => <input {...params} />}
                        />
                      </DemoItem>
                      <ErrorMessage name="endtime" component="div">
                        {(msg) => (
                          <FormHelperText error variant="filled">
                            {msg}
                          </FormHelperText>
                        )}
                      </ErrorMessage>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <Field
                        name="startDate"
                        as={DatePicker}
                        fullWidth
                        label="Start Date"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                        value={values.startDate}
                        onChange={(date: any) => setFieldValue('startDate', date)}
                        renderInput={(
                          params: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLInputElement> & React.InputHTMLAttributes<HTMLInputElement>,
                        ) => <input {...params} />}
                      />
                      <ErrorMessage name="startDate" component="div">
                        {(msg) => (
                          <FormHelperText error variant="filled">
                            {msg}
                          </FormHelperText>
                        )}
                      </ErrorMessage>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <Field
                        name="endDate"
                        as={DatePicker}
                        fullWidth
                        label="End Date"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                        value={values.startDate}
                        onChange={(date: any) => setFieldValue('endDate', date)}
                        renderInput={(
                          params: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLInputElement> & React.InputHTMLAttributes<HTMLInputElement>,
                        ) => <input {...params} />}
                      />
                      <ErrorMessage name="endDate" component="div">
                        {(msg) => (
                          <FormHelperText error variant="filled">
                            {msg}
                          </FormHelperText>
                        )}
                      </ErrorMessage>
                    </FormControl>
                  </Grid>
                </Grid>

                {/* Event Details */}
              </Paper>
              {/* Submit Button */}
              <Grid
                item
                //   py={1}
                width={'100%'}
                display={'flex'}
                gap={1}
                justifyContent={'flex-end'}
                xs={12}
              >
                <CustomButton
                  variant="outlined"
                  fullWidth
                  color="primary"
                  type="submit"
                  text="Cancel"
                  onClick={() => navigate(-1)}
                  disabled={isSubmitting || isValidating}
                />
                <CustomButton
                  color="primary"
                  fullWidth
                  type="submit"
                  text="Save Changes"
                  endIcon={<Schedule />}
                  disabled={isSubmitting || isValidating}
                />
              </Grid>
              <Divider sx={{ border: '1px solid rgba(128, 128, 128, 0.158)' }} />
            </Form>
          )}
        </Formik>
      </Grid>
    </>
  );
};

export default InterviewFormFields;
