// RoleInfo.js

import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, FieldArray, FieldProps } from 'formik';
import {
  Box,
  Typography,
  TextField,
  Stack,
  FormControl,
  FormHelperText,
  CardActions,
  Button,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Chip,
  Divider,
  Grid,
} from '@mui/material';
import SubCard from '../../../../../components/SubCard';
import { useFormData } from '../../../../../contexts/clientFormContext';
import CustomButton from '../../../../../components/button';
import { ArrowBack, BackHand, Edit, Send } from '@mui/icons-material';
import { techRoles } from '../../../../../lib/data/jobs';
import { availableSkills } from '../../../../../lib/data/skills';
import { Duration, EmploymentType, whenToStart } from '../../../../../lib/data/formFieldData';
import { ClientFormDataState } from '../../../../../types/client';
import { DatePicker } from '@mui/x-date-pickers';
import { addDays } from 'date-fns';

const additionalDataValidationSchema = Yup.object().shape({
  // dataContent: Yup.string().required("Additional Data is required"),
  durationForEmployment: Yup.string().required('Employment duration is required'),
  selectedSkills: Yup.array().required('Skills are required'),

  roleName: Yup.string().required('Add the role title'),
  whenToStart: Yup.date().required('Select when the project starts'),
  roleType: Yup.string().required('Please select the role you are hiring for!'),

  employmentType: Yup.string().required('Employment type is required'),
  tasks: Yup.array().of(Yup.string().required('Add and fill at least one task')).min(1, 'Add and fill at least one task'),
});
type RoleInfoWithClient = {
  atClientPage: boolean;
  handleExternalSubmit: (values: ClientFormDataState['Role Info']) => void;
};

type RoleInfoWithNavigation = {
  handleBack: () => void;
  onNext: (data: any, step?: any) => void;
};

type IRoleInfo = RoleInfoWithClient | RoleInfoWithNavigation;
const RoleInfo = (props: IRoleInfo) => {
  const { formDataState, dispatch } = useFormData();

  return (
    <Grid item mx={'auto'} lg={12} md={12} xs={12}>
      <Formik
        initialValues={formDataState['Role Info']}
        validationSchema={additionalDataValidationSchema}
        onSubmit={(values) => {
          if ('atClientPage' in props) {
            // TypeScript now knows that props has 'atClientPage' and 'handleExternalSubmit'
            if (props.atClientPage) {
              props.handleExternalSubmit(values);
              return;
            }
          } else {
            dispatch({ type: 'updateRoleInfo', payload: values });
            props.onNext(values);
          }
        }}
      >
        {({ isSubmitting, handleChange, values, setFieldValue }) => (
          <Form>
            <Box>
              {!('atClientPage' in props) && <Typography variant="h6">Step 3: Role Info</Typography>}
              <Stack mt={2} spacing={2}>
                <FormControl fullWidth>
                  <Field
                    name="roleName"
                    as={TextField}
                    label="Enter the role title"
                    placeholder={'eg. Senior Fullstack Engineer'}
                    variant="outlined"
                    fullWidth
                  />
                  <ErrorMessage name="title" component="div">
                    {(msg) => (
                      <FormHelperText error variant="filled">
                        {msg}
                      </FormHelperText>
                    )}
                  </ErrorMessage>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="role-label">Select role Are You Hiring For</InputLabel>
                  <Field name="roleType" as={Select} variant="outlined" fullWidth>
                    {Object.keys(techRoles).map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Field>
                  <ErrorMessage name="roleType" component="div">
                    {(msg) => (
                      <FormHelperText error variant="filled">
                        {msg}
                      </FormHelperText>
                    )}
                  </ErrorMessage>
                </FormControl>
                <Divider />

                <Typography variant="subtitle1">Tasks</Typography>
                <FormControl fullWidth>
                  <FieldArray
                    name="tasks"
                    render={(arrayHelpers) => (
                      <div>
                        {values.tasks.map((task, taskIndex) => (
                          <div key={taskIndex}>
                            <Field name={`tasks.${taskIndex}`} as={TextField} label={`Task ${taskIndex + 1}`} variant="outlined" fullWidth />
                            <Box
                              display={'flex'}
                              // justifyContent={"space-between"}
                              gap={1}
                            >
                              <CustomButton size="small" type="button" variant="contained" onClick={() => arrayHelpers.push('')} text="Add Task" />
                              {/* {values.tasks.length > 1 && ( */}
                              <CustomButton
                                size="small"
                                type="button"
                                variant="outlined"
                                onClick={() => arrayHelpers.remove(taskIndex)}
                                text="Remove Task"
                              />
                              {/* )} */}
                            </Box>
                          </div>
                        ))}
                        {values.tasks.length < 1 && (
                          <CustomButton size="small" type="button" variant="contained" onClick={() => arrayHelpers.push('')} text="Add a new task" />
                        )}
                      </div>
                    )}
                  />
                  <ErrorMessage name="tasks" component="div">
                    {(msg) => (
                      <FormHelperText error variant="filled">
                        {msg}
                      </FormHelperText>
                    )}
                  </ErrorMessage>
                </FormControl>
                {/* <TextField plac/> */}
                <Divider />

                <FormControl fullWidth>
                  <Autocomplete
                    multiple
                    id="skills-autocomplete"
                    options={availableSkills}
                    value={values.selectedSkills}
                    onChange={(_, newValue) => {
                      setFieldValue('selectedSkills', newValue.slice(0, 10)); // Limit to 10 skills
                    }}
                    renderTags={(value, getTagProps) => value.map((option, index) => <Chip label={option} {...getTagProps({ index })} />)}
                    renderInput={(params) => <TextField {...params} name="selectedSkills" label="Skills Required" variant="outlined" fullWidth />}
                  />
                  <ErrorMessage name="selectedSkills" component="div">
                    {(msg) => (
                      <FormHelperText error variant="filled">
                        {msg}
                      </FormHelperText>
                    )}
                  </ErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel component="legend">How Long Do you Need the Developer</FormLabel>
                  {Duration.map((duration) => (
                    <RadioGroup aria-label="items" name="durationForEmployment" value={values.durationForEmployment} onChange={handleChange} row>
                      <FormControlLabel value={duration.label} control={<Radio />} label={duration.label} />
                    </RadioGroup>
                  ))}
                  <ErrorMessage name="durationForEmployment" component="div">
                    {(msg) => (
                      <FormHelperText error variant="filled">
                        {msg}
                      </FormHelperText>
                    )}
                  </ErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel component="legend">When do you need the developer to start?</FormLabel>
                  <Box mt={1}>
                    <Field name="whenToStart">
                      {({ field }: FieldProps<Date | null>) => (
                        <DatePicker
                          value={field.value}
                          onChange={(date) => setFieldValue('whenToStart', date)}
                          minDate={new Date()}
                          maxDate={addDays(new Date(), 30)} // Limit to the next 30 days
                          format="MM/dd/yyyy"
                        />
                      )}
                    </Field>
                  </Box>
                  <ErrorMessage name="whenToStart" component="div">
                    {(msg) => (
                      <FormHelperText error variant="filled">
                        {msg}
                      </FormHelperText>
                    )}
                  </ErrorMessage>
                </FormControl>

                <FormControl>
                  <FormLabel component="legend">Whats the employment type</FormLabel>
                  {EmploymentType.map((duration) => (
                    <RadioGroup aria-label="items" name="employmentType" value={values.employmentType} onChange={handleChange} row>
                      <FormControlLabel value={duration.label} control={<Radio />} label={duration.label} />
                    </RadioGroup>
                  ))}
                  <ErrorMessage name="employmentType" component="div">
                    {(msg) => (
                      <FormHelperText error variant="filled">
                        {msg}
                      </FormHelperText>
                    )}
                  </ErrorMessage>
                </FormControl>
                <FormControl fullWidth>
                  <Field name="salary" as={TextField} label="Expect salary" variant="outlined" fullWidth />
                  <ErrorMessage name="salary" component="div">
                    {(msg) => (
                      <FormHelperText error variant="filled">
                        {msg}
                      </FormHelperText>
                    )}
                  </ErrorMessage>
                </FormControl>
                {'atClientPage' in props && props.atClientPage ? (
                  <CustomButton text="Save" size="small" fullWidth startIcon={<Edit />} disabled={isSubmitting} type="submit" />
                ) : (
                  <Box display={'flex'} gap={1}>
                    <CustomButton
                      text="Back"
                      fullWidth
                      startIcon={<ArrowBack />}
                      disabled={isSubmitting}
                      type="button"
                      variant="outlined"
                      onClick={() => 'onNext' in props && props.handleBack()}
                    />
                    <CustomButton text="Next" fullWidth disabled={isSubmitting} variant="contained" type="submit" />
                  </Box>
                )}
              </Stack>
            </Box>
          </Form>
        )}
      </Formik>
    </Grid>
  );
};

export default RoleInfo;
