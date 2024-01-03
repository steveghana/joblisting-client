import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

// project imports
import MainCard from '../../../components/MainCard';
import SecondaryAction from '../../../components/CardSecondaryAction';
import { themePalette } from '../../../themes/schemes/palette';

// styles
const IFrameWrapper = styled('iframe')(({ theme }) => ({
  height: 'calc(100vh - 210px)',
  border: '1px solid',
  borderColor: themePalette.primary.light,
}));

// ============================|| MATERIAL ICONS ||============================ //

const MaterialIcons = () => (
  <MainCard title="Dev Hub">
    <Typography>This is the dev hub</Typography>
  </MainCard>
);

export default MaterialIcons;
