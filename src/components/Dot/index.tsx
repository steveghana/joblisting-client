import { Typography } from '@mui/material';

const Dot = () => {
  return (
    <Typography
      sx={{
        width: '4px',
        height: '4px',
        borderRadius: '50%',
        background: 'grey',
      }}
    ></Typography>
  );
};
export default Dot;
