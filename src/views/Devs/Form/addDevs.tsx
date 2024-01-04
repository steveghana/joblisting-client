import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { TextField, MenuItem, FormControl, InputLabel, Select, Stack, Box, Autocomplete, FormHelperText, Chip } from '@mui/material';
import CustomButton from '@/components/button';
import { availableSkills } from '@/lib/data/skills';
import { techRoles } from '@/lib/data/jobs';
import { toast } from 'react-toastify';
import { useAddDevMutation } from '@/store/services/dev.service';
import { IPartialDev } from '@/types/devs';
const emails = ['username@gmail.com', 'user02@gmail.com'];

export interface IAddDevsProps {
  open: boolean;
  onClose: () => void;
}
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Please enter your first name'),
  lastName: Yup.string().required('Please add your last name'),
  address: Yup.string().required('Please enter your address'),
  role: Yup.string().required('Role is required'),
  phone_number: Yup.string().required('Please enter your phone number'),
  skills: Yup.array()
    .required('Skills are required')
    .of(Yup.string().required('Each skill must be a non-empty string').min(1, 'Each skill must be a non-empty string')),
  email: Yup.string().email('Please enter a valid email address').required('Email is required'),
  years_of_experience: Yup.string().required('Years of experience is required'),
  role_status: Yup.string().required('Role status is required'),
});
function AddDevs(props: IAddDevsProps) {
  const { onClose, open } = props;
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle variant="h4">Add new Developer</DialogTitle>
      <CreateDeveloperForm onClose={onClose} />
    </Dialog>
  );
}

const CreateDeveloperForm = ({ onClose }: { onClose: () => void }) => {
  const initialValues: IPartialDev = {
    firstName: '',
    lastName: '',
    address: '',
    salary: 0,
    role: '',
    phone_number: '',
    skills: [],
    email: '',
    years_of_experience: '',
    role_status: 'InHouse',
  };
  const [addDev, { isError, isLoading }] = useAddDevMutation();
  const onSubmit = async (values: typeof initialValues, formikHelpers: FormikHelpers<IPartialDev>) => {
    if (!values.skills.length) {
      toast.warning(`Please select at least one skill`, { position: 'bottom-center' });
    } else {
      try {
        const response = await addDev({ ...values }).unwrap();
        if (response && !isError) {
          toast.success('Developer added successfully', { position: 'bottom-center' });
          onClose();
        }
      } catch (error) {
        toast.error('Couldnt add developer, check credentials and try again later', { position: 'bottom-center' });
        formikHelpers.setSubmitting(false);
        return;
      }
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ values, errors, touched, handleSubmit, isSubmitting, setFieldValue }) => (
        <Form>
          <Box sx={{ p: 1.5 }}>
            <Field id="firstName" name="firstName" label="First Name" variant="outlined" fullWidth margin="normal" as={TextField} />
            <ErrorMessage name="firstName" component="div">
              {(msg) => (
                <FormHelperText error variant="filled">
                  {msg}
                </FormHelperText>
              )}
            </ErrorMessage>

            <Field id="lastName" name="lastName" label="Last Name" variant="outlined" fullWidth margin="normal" as={TextField} />
            <ErrorMessage name="lastName" component="div">
              {(msg) => (
                <FormHelperText error variant="filled">
                  {msg}
                </FormHelperText>
              )}
            </ErrorMessage>

            <Field id="address" name="address" label="Address" variant="outlined" fullWidth margin="normal" as={TextField} />
            <ErrorMessage name="address" component="div">
              {(msg) => (
                <FormHelperText error variant="filled">
                  {msg}
                </FormHelperText>
              )}
            </ErrorMessage>

            <Field
              id="salary"
              name="salary"
              //   label="Salary"
              variant="outlined"
              fullWidth
              value={values.salary}
              margin="normal"
              type="number"
              as={TextField}
            />
            <ErrorMessage name="salary" component="div">
              {(msg) => (
                <FormHelperText error variant="filled">
                  {msg}
                </FormHelperText>
              )}
            </ErrorMessage>

            <FormControl fullWidth margin="normal">
              <InputLabel id="role-label">Role</InputLabel>
              <Field name="role" as={Select} variant="outlined" fullWidth>
                {Object.keys(techRoles).map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Field>
              <ErrorMessage name="role" component="div">
                {(msg) => (
                  <FormHelperText error variant="filled">
                    {msg}
                  </FormHelperText>
                )}
              </ErrorMessage>
            </FormControl>

            <Field id="phone_number" name="phone_number" label="Phone Number" variant="outlined" fullWidth margin="normal" as={TextField} />
            <ErrorMessage name="phone_number" component="div">
              {(msg) => (
                <FormHelperText error variant="filled">
                  {msg}
                </FormHelperText>
              )}
            </ErrorMessage>

            <FormControl fullWidth margin="normal">
              <Autocomplete
                multiple
                id="skills-autocomplete"
                options={availableSkills}
                value={values.skills}
                onChange={(_, newValue) => {
                  setFieldValue('skills', newValue.slice(0, 10)); // Limit to 10 skills
                }}
                renderTags={(value, getTagProps) => value.map((option, index) => <Chip label={option} {...getTagProps({ index })} />)}
                renderInput={(params) => <TextField {...params} name="skills" label="Select Skills" variant="outlined" fullWidth />}
              />
              <ErrorMessage name="skills" component="div">
                {(msg) => (
                  <FormHelperText error variant="filled">
                    {msg}
                  </FormHelperText>
                )}
              </ErrorMessage>
            </FormControl>

            <Field id="email" name="email" label="Email" variant="outlined" fullWidth margin="normal" as={TextField} />
            <ErrorMessage name="email" component="div">
              {(msg) => (
                <FormHelperText error variant="filled">
                  {msg}
                </FormHelperText>
              )}
            </ErrorMessage>

            <Field
              id="years_of_experience"
              name="years_of_experience"
              label="Years of Experience"
              variant="outlined"
              fullWidth
              margin="normal"
              as={TextField}
            />
            <ErrorMessage name="years_of_experience" component="div">
              {(msg) => (
                <FormHelperText error variant="filled">
                  {msg}
                </FormHelperText>
              )}
            </ErrorMessage>

            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="role_status">Role Status</InputLabel>
              <Field id="role_status" name="role_status" label="Role Status" as={Select}>
                {/* Add your role status options here */}
                <MenuItem value="InHouse">In-House</MenuItem>
                <MenuItem value="External">External</MenuItem>
              </Field>
            </FormControl>
            <ErrorMessage name="role_status" component="div">
              {(msg) => (
                <FormHelperText error variant="filled">
                  {msg}
                </FormHelperText>
              )}
            </ErrorMessage>
            <CustomButton type="submit" fullWidth disabled={isSubmitting || isLoading} loading={isSubmitting || isLoading}>
              Submit
            </CustomButton>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AddDevs;
