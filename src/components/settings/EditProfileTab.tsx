import { Grid, Card, Box } from '@mui/material';
import MyProfile from './MyProfile';
// import { userdata as user } from './userdata';
import { styled } from '@mui/material/styles';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import { IUser } from '@/types/user';
const Input = styled('input')({
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
      background: ${theme.colors?.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors?.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors?.primary.dark};
      }
    }
`,
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`,
);

const CardCoverAction = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
`,
);

function EditProfileTab({ user }: { user: IUser }) {
  // const []
  return (
    <Grid container spacing={1}>
      <Grid container py={2}>
        <MyProfile user={user} />
      </Grid>
    </Grid>
  );
}

export default EditProfileTab;
