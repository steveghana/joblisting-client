import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

import DropZone from './DropZone';
import CountrySelector, { CountryType } from './CountrySelector';
import { LargeTextField } from './EditorToolbar';

import { IUser } from '../../types/user';
import { Avatar, InputBase, MenuItem, OutlinedInput, styled, useMediaQuery, useTheme } from '@mui/material';
import { Field, Formik } from 'formik';
import { Accessibility, InsertDriveFileRounded, UploadTwoTone, VideocamRounded } from '@mui/icons-material';
import { themePalette } from '@/themes/schemes/palette';
import { getRandomColor } from '@/utils/generateRandomColors';
import CustomButton from '../button';
import FileUpload from './FileUpload';
import SubCard from '../SubCard';
import { useUpdateUserMutation } from '@/store/services/userAuth.service';
import { toast } from 'react-toastify';
const UploadInput = styled('input')({
  display: 'none',
});
const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`,
);
const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`,
);
export default function MyProfile({ user }: { user: IUser }) {
  const theme = useTheme();
  const experience = ['1', '3', '4', '5', '6', '7', '8', '10+'];
  const [updateUser, { isLoading, isError }] = useUpdateUserMutation();
  const md = useMediaQuery(theme.breakpoints.down('sm'));

  // const tab = useMediaQuery(theme.breakpoints.only("md"));
  return (
    <Box
      sx={{
        flex: 1,
        width: '100%',
      }}
    >
      <Stack
        spacing={4}
        sx={{
          display: 'flex',
          // maxWidth: "800px",
          mx: 'auto',
        }}
      >
        <Formik
          initialValues={{
            email: user.email || '',
            linkedin: user.linkedin || '',
            bio: user.bio || '',
            location: { code: '', label: '', phone: '' } as CountryType,
            role: user.role || '',
            firstName: user.firstName || '',
            // experience:user.exper '',
            lastName: user.lastName || '',
            // submit: null,
          }}
          onSubmit={async (values, setters) => {
            try {
              const response = await updateUser({ ...values });
              if (response && !isError) {
                toast.success('User info updated successfully', {
                  position: 'bottom-center',
                });
                setters.resetForm();
              }
            } catch (error: any) {
              toast.error('Failed to update user information, please try again later', {
                position: 'bottom-center',
              });
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <SubCard>
                <Box sx={{ mb: 1 }}>
                  <Typography>Personal info</Typography>
                  <Typography variant="caption">Customize how your profile information will appear</Typography>
                </Box>
                <Divider />

                <Stack direction={md ? 'column' : 'row'} spacing={2.5} sx={{ my: 1 }}>
                  <Stack direction={md ? 'row' : 'column'} justifyContent={md ? 'center' : 'unset'} spacing={1}>
                    {/* <Avatar size="xl">
                      <img
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                        srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                        loading="lazy"
                        alt=""
                      />
                    </Avatar> */}
                    <AvatarWrapper>
                      {/* <Avatar variant="rounded" alt={user.firstName} src={user.avatar} /> */}
                      <Avatar variant="rounded" sx={{ backgroundColor: getRandomColor(), color: 'white', fontSize: '.85rem' }} src={user.avatar}>
                        {' '}
                        {!user.avatar ? (
                          `${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`
                        ) : (
                          <img
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                            srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                            loading="lazy"
                            alt=""
                          />
                        )}
                      </Avatar>

                      <ButtonUploadWrapper>
                        <UploadInput accept="image/*" id="icon-button-file" name="icon-button-file" type="file" />
                        <label htmlFor="icon-button-file">
                          <IconButton component="span" color="primary">
                            <UploadTwoTone />
                          </IconButton>
                        </label>
                      </ButtonUploadWrapper>
                    </AvatarWrapper>

                    {/* <IconButton
                      // aria-label="upload new picture"
                      // size="sm"
                      sx={{
                        bgcolor: 'background.body',
                        position: 'absolute',
                        zIndex: 2,
                        borderRadius: '50%',
                        left: 90,
                        top: 175,
                        boxShadow: 'sm',
                      }}
                    >
                      <EditRoundedIcon />
                    </IconButton> */}
                  </Stack>
                  <Stack spacing={2} sx={{ flexGrow: 1 }}>
                    <Stack spacing={1}>
                      <FormLabel>FirstName</FormLabel>

                      <OutlinedInput
                        placeholder="First Name"
                        value={values.firstName}
                        name="firstName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        defaultValue=""
                      />
                      <FormLabel htmlFor="outlined-adornment-email-register">LastName</FormLabel>
                      <OutlinedInput
                        placeholder="Last Name"
                        value={values.lastName}
                        name="lastName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        defaultValue=""
                      />

                      <FormControl>
                        <FormLabel htmlFor="outlined-adornment-email-register">LinkedIn</FormLabel>
                        <Field
                          as={OutlinedInput}
                          type="url"
                          value={values.linkedin}
                          placeholder="URL"
                          name="linkedin"
                          // onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Stack>
                    <Stack direction="column" spacing={2}>
                      <FormControl>
                        <FormLabel>Role</FormLabel>
                        <OutlinedInput value={values.role} name="role" onChange={handleChange} />
                      </FormControl>
                      <FormControl
                        // error={Boolean(touched.email && errors.email)}
                        sx={{ flexGrow: 1 }}
                      >
                        <FormLabel>Email</FormLabel>
                        <OutlinedInput
                          placeholder="email"
                          value={values.email}
                          name="lastName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="email"
                          defaultValue="siriwatk@test.com"
                          // sx={{ ...themeTypography.customInput, flexGrow: 1 }}
                          size="small"
                          startAdornment={<EmailRoundedIcon />}
                        />
                        {touched.email && errors.email && <FormHelperText>{errors.email}</FormHelperText>}
                      </FormControl>
                      {/* <FormControl>
                        <FormLabel>Years of experience</FormLabel>
                        <Select
                          name="experience"
                          size="small"
                          onChange={handleChange}
                          startAdornment={<Accessibility />}
                          defaultValue="1"
                        >
                          {experience.map((item) => (
                            <MenuItem key={item} value={item}>
                              <Typography ml={0.5}>{item}</Typography>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl> */}
                    </Stack>
                    <Box my={1}>
                      <CountrySelector onChange={handleChange} name={'location'} />
                    </Box>
                    <div>
                      <FormControl sx={{ display: { sm: 'contents' } }}>
                        <FormLabel>Timezone</FormLabel>
                        <Select
                          size="small"
                          fullWidth
                          placeholder="Timezone"
                          // startDecorator={<AccessTimeFilledRoundedIcon />}
                          startAdornment={<AccessTimeFilledRoundedIcon />}
                          defaultValue="1"
                        >
                          <MenuItem value={'1'}>
                            Indochina Time (Bangkok) <Typography ml={0.5}>— GMT+07:00</Typography>
                          </MenuItem>
                          <MenuItem value="2">
                            Indochina Time (Ho Chi Minh City) <Typography ml={0.5}>— GMT+07:00</Typography>
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </Stack>
                </Stack>
              </SubCard>
              <SubCard sx={{ my: 1 }}>
                <Box sx={{ mb: 1 }}>
                  <Typography>Bio</Typography>
                  <Typography variant="caption">Write a short introduction to be displayed on your profile</Typography>
                </Box>
                <Divider />
                <Stack spacing={2} sx={{ my: 1 }}>
                  <FormControl
                    // error={Boolean(touched.email && errors.email)}
                    sx={{ flexGrow: 1 }}
                  >
                    {/* <Field> */}
                    <LargeTextField name="bio" onChange={handleChange} />
                    {/* </Field> */}
                  </FormControl>
                </Stack>
                <Box sx={{ mb: 1 }}>
                  <Typography>Portfolio projects</Typography>
                  <Typography variant="caption">Share a few snippets of your work.</Typography>
                </Box>

                <Divider />
                <Stack spacing={2} sx={{ my: 1 }}>
                  <DropZone />
                  {/* <FileUpload
                    icon={<InsertDriveFileRounded />}
                    fileName="Tech design requirements.pdf"
                    fileSize="200 kB"
                    progress={100}
                  />
                  <FileUpload
                    icon={<VideocamRounded />}
                    fileName="Dashboard prototype recording.mp4"
                    fileSize="16 MB"
                    progress={40}
                  /> */}
                </Stack>
              </SubCard>
              <Box display={'flex'} justifyContent={'center'} gap={1}>
                <CustomButton size="small" disabled={isLoading || isSubmitting} loading={isLoading || isSubmitting} variant="outlined">
                  Cancel
                </CustomButton>
                <CustomButton
                  type="submit"
                  disabled={isLoading || isSubmitting}
                  loading={isLoading || isSubmitting}
                  // size="sm"
                  size="small"
                  sx={{ background: themePalette.primary.main, borderRadius: '10px' }}
                >
                  Save
                </CustomButton>
              </Box>
            </form>
          )}
        </Formik>
      </Stack>
    </Box>
  );
}
