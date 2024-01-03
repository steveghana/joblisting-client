import { Box, Grid, Typography } from '@mui/material';
import NoDAta from '@/assets/images/empty-box.png';
import { themePalette } from '@/themes/schemes/palette';

const NoData = () => {
  return (
    <Grid height={'100%'} width={'100%'} sx={{ display: 'flex', alignSelf: 'center', overflow: 'hidden', p: 1 }}>
      <Box
        width={'100%'}
        height={'100%'}
        flexGrow={1}
        minHeight={100}
        m={'auto'}
        alignContent={'stretch'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
      >
        <img width={150} height={150} src={NoDAta} alt="nodata" />
        <Typography
          sx={{
            py: 2,
            textAlign: 'center',
            color: 'grey',
            // color: 'white',
            // fontSize: 18,
            fontWeight: 600,
          }}
          variant="subtitle1"
        >
          No data to display
        </Typography>
      </Box>
    </Grid>
  );
};
export default NoData;
