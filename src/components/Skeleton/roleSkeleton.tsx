import React from 'react';
import { Grid, Avatar, Box, Typography, ButtonBase, Button } from '@mui/material';
import { Skeleton } from '@mui/material';
import SubCard from '../SubCard';
import { themePalette } from '@/themes/schemes/palette';

const RoleSkeleton = (props: { feature?: boolean }) => {
  return (
    <Grid sx={{ cursor: 'pointer' }} item xs={2} sm={4} md={4}>
      <SubCard sx={{ cursor: 'pointer' }}>
        <Grid container direction="column" spacing={0}>
          <Grid className="avatar" display={'flex'} alignItems={'flex-start'} gap={0.8} item>
            <Skeleton variant="circular" width={40} height={40} />
            <Box mr={'auto'}>
              <Skeleton width={100} />
              <Skeleton width={80} />
              <Box>
                <Skeleton width={200} />
                <Box sx={{ color: 'rgba(0, 0, 0, 0.5)' }} display={'flex'} gap={'.3rem'} my={1} alignItems={'center'}>
                  <Skeleton variant="rectangular" width={20} height={20} />
                  <Typography variant="caption" fontWeight={700}>
                    <Skeleton width={30} />
                  </Typography>
                  <Typography variant="caption" fontWeight={700}>
                    <Skeleton width={30} />
                  </Typography>
                </Box>
              </Box>
            </Box>
            <ButtonBase>
              <Skeleton variant="rectangular" width={30} height={30} />
            </ButtonBase>
          </Grid>
          <Grid mb={1} className="mail links" item>
            <Grid mb={1} className="mail links" item>
              <Skeleton width={100} />
              <Box
                my={2}
                alignItems={'center'}
                gap={'.8rem'}
                borderRadius={2}
                p={1}
                border={'2px solid rgba(0, 0, 0, 0.1)'}
                display={'flex'}
                flexWrap={'wrap'}
              >
                <Skeleton width={150} />
                <Box display={'flex'} alignItems={'center'} gap={0.4}>
                  <Skeleton width={80} />
                  <Skeleton width={80} />
                  <Skeleton width={80} />
                </Box>
                <Box
                  sx={{
                    ml: { md: 0, lg: 'auto' },
                    flexDirection: { sm: 'column', md: 'row' },
                    justifyContent: { sm: 'flex-end', md: 'flex-start' },
                  }}
                  display={'flex'}
                  justifyContent={'flex-start'}
                  flexWrap={'wrap'}
                  alignItems={'center'}
                  flexDirection={props.feature ? 'column' : 'row'}
                  gap={1}
                >
                  <Box
                    display={'flex'}
                    flexDirection={'column'}
                    sx={{
                      justifyContent: { md: 'flex-start', lg: 'flex-end' },
                      alignItems: { md: 'flex-start', lg: 'flex-end' },
                    }}
                  >
                    <Typography variant="caption" fontWeight={700} color={'green'}>
                      <Skeleton width={120} />
                    </Typography>
                    <Typography>
                      <Skeleton width={150} />
                      <Skeleton width={80} />
                    </Typography>
                  </Box>
                  <Grid
                    display={'flex'}
                    sx={{
                      width: {
                        md: '100%',
                        lg: '100%',
                      },
                    }}
                    justifyContent={'center'}
                    gap={0.5}
                  >
                    <Skeleton width={150} />
                  </Grid>
                </Box>
                <Grid
                  sx={{
                    maxWidth: '80%',
                    color: 'white',
                    px: 2,
                    borderRadius: '7px',
                  }}
                >
                  <Typography variant="caption" color={'white'}>
                    <Skeleton width={150} />
                  </Typography>
                </Grid>
                <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center' }} color="primary">
                  <Skeleton width={150} />
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </SubCard>
    </Grid>
  );
};

export default RoleSkeleton;
