import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  FormControl,
  FormHelperText,
  Checkbox,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Autocomplete,
  Chip,
} from '@mui/material';
import { useFormData } from '../../../../../contexts/clientFormContext';
import CustomButton from '../../../../../components/button';

import ContrySelector from '../../../../../components/settings/CountrySelector';
import { industriesForTechStartups } from '../../../../../lib/data/skills';
import { employed, formFields } from '../../../../../lib/data/formFieldData';

// Validation schema for Project Info
const projectInfoValidationSchema = Yup.object().shape({
  companyName: Yup.string().required('Company Name is required'),
  projectTitle: Yup.string().required('Project Title is required'),
  aboutTheCompany: Yup.string().required('Give some brief introduction about the company'),
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
  name: Yup.string().max(255).min(2).required('Please enter a valid name'),
  phoneNumber: Yup.string()
    .matches(/^\+?[0-9]{8,15}$/, 'Please enter a valid phone number')
    .required('Please enter your phone number'),
  numOfEmployees: Yup.string().required('Select number of employees'),
});

const ProjectInfo = ({ onNext }: { onNext: (data: any, step?: any) => void }) => {
  const { formDataState, dispatch } = useFormData();
  return (
    <Formik
      initialValues={formDataState['Client Info']}
      validationSchema={projectInfoValidationSchema}
      onSubmit={(values) => {
        dispatch({ type: 'updateclientInfo', payload: values });
        onNext(values);
      }}
    >
      {({ isSubmitting, values, handleChange, setFieldValue }) => (
        <Form>
          <Box>
            <Typography my={2} variant="h6">
              Step 1: Project Information
            </Typography>
            <Stack spacing={2}>
              {formFields.map((item) => (
                <>
                  <Field key={item.name} name={item.name} as={TextField} label={item.label} variant="outlined" fullWidth margin="normal" />
                  <ErrorMessage name={item.name} component="div">
                    {(msg) => (
                      <FormHelperText error variant="filled">
                        {msg}
                      </FormHelperText>
                    )}
                  </ErrorMessage>
                </>
              ))}
              <Box my={1}>
                <ContrySelector onChange={handleChange} name={'country'} />
              </Box>
              <FormControl fullWidth>
                <Autocomplete
                  multiple
                  id="industry-autocomplete"
                  options={Object.keys(industriesForTechStartups)}
                  value={values.industry}
                  onChange={(_, newValue) => {
                    setFieldValue('industry', newValue.slice(0, 10)); // Limit to 10 skills
                  }}
                  renderTags={(value, getTagProps) => value.map((option, index) => <Chip label={option} {...getTagProps({ index })} />)}
                  renderInput={(params) => <TextField {...params} name="industry" label="Select an industry" variant="outlined" fullWidth />}
                />
                <ErrorMessage name="industry" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>
              {/* <Country */}
              <FormControl>
                <FormLabel component="legend">How many people are employed at the company?</FormLabel>
                {employed.map((employed) => (
                  <RadioGroup aria-label="items" name="numOfEmployees" value={values.numOfEmployees} onChange={handleChange} row>
                    <FormControlLabel value={employed.label} control={<Radio />} label={employed.label} />
                  </RadioGroup>
                ))}
                <ErrorMessage name="numOfEmployees" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>
              <FormControl fullWidth>
                <Field name="companyName" as={TextField} label="Company Name" variant="outlined" fullWidth />
                <ErrorMessage name="companyName" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>
              <FormControl fullWidth>
                <Field name="companyLogo" as={TextField} label="Company Logo link" variant="outlined" fullWidth />
                <ErrorMessage name="companyLogo" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>
              <FormControl fullWidth>
                <Field name="projectTitle" as={TextField} label="Project Title" variant="outlined" fullWidth />
                <ErrorMessage name="projectTitle" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>
              <FormControl fullWidth>
                <Field name="aboutTheCompany" as={TextField} label="About The Company" multiline rows={4} variant="outlined" fullWidth />
                <ErrorMessage name="aboutTheCompany" component="div">
                  {(msg) => (
                    <FormHelperText error variant="filled">
                      {msg}
                    </FormHelperText>
                  )}
                </ErrorMessage>
              </FormControl>
              <CustomButton text="Next" type="submit" variant="contained" disabled={isSubmitting} />
            </Stack>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ProjectInfo;
