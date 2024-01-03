import React from 'react';
import {
  Typography,
  CardContent,
  CardActions,
  Button,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormLabel,
  Divider,
  ButtonBase,
  Chip,
  Checkbox,
  FormControlLabel,
  FormHelperText,
} from '@mui/material';
import * as Yup from 'yup';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import SubCard from '../../../../../components/SubCard';
import { ExpandMore, Send } from '@mui/icons-material';
import { ReviewLabelObj } from '../../../../../lib/data/data';
import { useFormData } from '../../../../../contexts/clientFormContext';
import { themePalette } from '../../../../../themes/schemes/palette';
import CustomButton from '../../../../../components/button';
import { useAddClientMutation } from '../../../../../store/services/client.service';
import { useNavigate } from 'react-router';
import { techRoles } from '../../../../../lib/data/jobs';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

type FormData = {
  [key: string]: string | string[] | boolean;
};
interface ReviewAndSubmitProps {
  formData: FormData;
  onEdit: (target: number) => void;
}
const reviewSchema = Yup.object().shape({
  agreedToTerms: Yup.boolean().oneOf([true], 'Must agree to terms').required('You must agree to terms and conditions'),
});
const ReviewAndSubmit: React.FC<ReviewAndSubmitProps> = ({ onEdit }) => {
  const { formDataState } = useFormData();
  const navigate = useNavigate();
  const [createClient, { data, isLoading, isError, isSuccess, error }] = useAddClientMutation();
  const handleSubmit = async () => {
    try {
      const response = await createClient({
        ...formDataState,
      }).unwrap();
      if (response && !isError) {
        navigate('/dashboard/roles/jobs');
        toast.success('Client Added Succcessfully', {
          position: 'bottom-center',
        });
      }
    } catch (error) {}
  };
  return (
    <Formik validationSchema={reviewSchema} initialValues={{ agreedToTerms: false }} onSubmit={() => handleSubmit()}>
      {({ isSubmitting }) => (
        <Form>
          <SubCard>
            <CardContent>
              <Typography variant="body2">Review and Submit</Typography>

              <Divider sx={{ mt: 1 }} />
              <Grid>
                {Object.keys(formDataState).map((item, index) => (
                  <>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography variant="h6" fontWeight={'bold'}>
                          {item}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Grid>
                          {Object.entries(formDataState[item as keyof typeof formDataState] as Record<string, string | [string] | any>).map(
                            ([key, value], index) => (
                              <Grid my={index !== 0 ? 4 : 0} item xs={12} key={key}>
                                <FormLabel component="legend">
                                  <Typography fontWeight={'bold'}>{ReviewLabelObj[key as keyof typeof ReviewLabelObj]}*</Typography>
                                </FormLabel>
                                <Typography mt={1}>
                                  {Array.isArray(value) && key === 'selectedSkills'
                                    ? value?.map((value, index) => <Chip label={value} key={index} />)
                                    : Array.isArray(value) && key === 'tasks'
                                    ? value?.map((value, i) => <Typography key={i}>{value}</Typography>)
                                    : value?.label
                                    ? value.label
                                    : value?.length > 70
                                    ? value.slice(0, 70) + '....'
                                    : key === 'whenToStart'
                                    ? format(new Date(value), 'yyyy-MM-dd')
                                    : value}
                                </Typography>
                              </Grid>
                            ),
                          )}
                        </Grid>
                        {/* <Divider /> */}
                        <ButtonBase
                          sx={{
                            alignSelf: 'flex-start',
                            padding: 1,
                            outline: 'none',
                          }}
                        >
                          <Typography color={'blue'} onClick={() => onEdit(index)}>
                            Edit
                          </Typography>
                        </ButtonBase>
                      </AccordionDetails>
                    </Accordion>
                  </>
                ))}
              </Grid>

              <Field name="agreedToTerms" type="checkbox" as={Checkbox} />
              <label htmlFor="agreedToTerms">I agree to the terms and conditions</label>
              <ErrorMessage name="agreedToTerms" component="div">
                {(msg) => (
                  <FormHelperText error variant="filled">
                    {msg}
                  </FormHelperText>
                )}
              </ErrorMessage>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', pt: 2 }}>
              <CustomButton fullWidth endIcon={<Send />} type="submit" variant="contained" disabled={isLoading} loading={isLoading} text="Submit" />
            </CardActions>
          </SubCard>
        </Form>
      )}
    </Formik>
  );
};

export default ReviewAndSubmit;
