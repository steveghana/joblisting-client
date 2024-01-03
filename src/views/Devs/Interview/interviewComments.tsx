import CustomButton from '@/components/button';
import { useAddInterviewCommentMutation } from '@/store/services/interview.service';
import { TInterviewComment } from '@/types/interviews';
import { AddComment, Comment, ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, FormControl, FormHelperText, Grid, TextField, Typography } from '@mui/material';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

type TCommentWithoutIds = Omit<TInterviewComment, 'interviewId'>;

const validationSchema = Yup.object({
  message: Yup.string().required('Please enter your message'),
  name: Yup.string().required('Please enter your name'),
});
const InterviewComments = ({ interviewId, comments }: { interviewId: string; comments: TCommentWithoutIds[] }) => {
  const [addComment, { isLoading, isSuccess }] = useAddInterviewCommentMutation();
  const initialValues: TCommentWithoutIds = {
    name: '',
    message: '',
  };
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography variant="subtitle1" component={'animate'}>
          Comments*
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {comments.map((comment, index) => (
          <Grid key={comment.id}>
            <Box style={{ marginBottom: '10px' }}>
              <Typography variant="subtitle1">
                <strong>{comment.name}:</strong> {comment.message}
              </Typography>
            </Box>
          </Grid>
        ))}
        <Formik
          initialValues={initialValues}
          onSubmit={async (values: TCommentWithoutIds, formikHelpers: FormikHelpers<TCommentWithoutIds>) => {
            try {
              const response = await addComment({
                interviewId: interviewId,
                name: values.name,
                message: values.message,
              }).unwrap();
              if (response) {
                toast.success('Comment added successfully!', { position: 'bottom-center' });
                formikHelpers.resetForm();
              }
            } catch (err) {
              console.log(err);
              // toast.error('Couldnt add comment!, please try again later', { position: 'bottom-center' });
            }
          }}
          validationSchema={validationSchema}
        >
          <Form>
            <FormControl fullWidth margin="normal">
              <Field as={TextField} name={'name'} label="Your Name" variant="outlined" fullWidth />
              <ErrorMessage name="name" component="div">
                {(msg) => (
                  <FormHelperText error variant="filled">
                    {msg}
                  </FormHelperText>
                )}
              </ErrorMessage>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Field as={TextField} name={'message'} label="Add a Comment" variant="outlined" fullWidth multiline rows={3} />
              <ErrorMessage name="message" component="div">
                {(msg) => (
                  <FormHelperText error variant="filled">
                    {msg}
                  </FormHelperText>
                )}
              </ErrorMessage>
            </FormControl>
            <CustomButton
              variant="contained"
              color="primary"
              loading={isLoading}
              type="submit"
              text="Add Comment"
              endIcon={<Comment fontSize="small" />}
            />
          </Form>
        </Formik>
      </AccordionDetails>
    </Accordion>
  );
};

export default InterviewComments;
