import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Button, Box, Typography } from '@mui/material';
import CustomButton from '../../../../components/button';

interface AdditionalInfoData {
  coverLetter: string;
}

interface AdditionalInfoFormProps {
  onSubmit: (values: string) => void;
  onBack: () => void;
}

const AdditionalInfoForm: React.FC<AdditionalInfoFormProps> = ({ onSubmit, onBack }) => {
  return (
    <>
      <Typography variant="h4">Cover Letter</Typography>

      <Formik
        initialValues={{ coverLetter: '' }}
        onSubmit={(values) => {
          onSubmit(values.coverLetter);
        }}
      >
        {() => (
          <Form>
            <Field name="coverLetter" as={TextField} label="Cover Letter" variant="outlined" fullWidth margin="normal" multiline rows={8} />
            <Box width={'100%'} gap={1} display={'flex'} justifyContent={'center'}>
              <CustomButton
                variant="outlined"
                onClick={onBack}
                // fullWidth={matchUpMd ? false : true}
                text="Back"
                type="submit"
              />
              <CustomButton
                variant="contained"
                // fullWidth={matchUpMd ? false : true}
                text="Submit Application"
                type="submit"
              />
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AdditionalInfoForm;
