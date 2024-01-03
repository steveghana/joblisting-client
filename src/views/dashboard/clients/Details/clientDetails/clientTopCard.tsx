import React from 'react';
import { ArrowBackTwoTone, Email, Facebook, LocalActivity, Phone, Pinterest, Title, VerifiedUser, WhatsApp } from '@mui/icons-material';
import SubCard from '@/components/SubCard';
import { themePalette } from '@/themes/schemes/palette';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import { IClient } from '@/types/client';
type TClientCard = {
  data: IClient;
};
const ClientTopCard = ({ data }: TClientCard) => {
  return (
    <SubCard>
      <Grid display={'flex'} mb={3} mt={1}>
        <Box
          borderRight={`1px solid ${themePalette.primary.light}`}
          display={'flex'}
          flexDirection={'column'}
          flexWrap={'wrap'}
          maxWidth={'30%'}
          alignItems={'center'}
          gap={1.5}
          p={1}
        >
          <Avatar sx={{ width: 56, height: 56 }} src={data!.companyLogo || data!.avatar} />
          <Typography>{data!.companyName}</Typography>

          <Box display={'flex'} gap={1} alignItems={'center'}>
            <Facebook />
            <Pinterest />
            <WhatsApp />
          </Box>
        </Box>
        <Grid display={'flex'} flexDirection={'column'} gap={1} p={1}>
          <Box display={'flex'} flexWrap={'wrap'} justifyContent={'space-between'} gap={1} alignItems={'center'}>
            <Grid display={'flex'} gap={1}>
              <VerifiedUser color="disabled" />
              <Box>
                <Typography variant="caption">Contact name</Typography>
                <Typography>{data!.name}</Typography>
              </Box>
            </Grid>
            <Grid display={'flex'} gap={1}>
              <VerifiedUser color="disabled" />
              <Box>
                <Typography variant="caption">Company name</Typography>
                <Typography>{data!.companyName}</Typography>
              </Box>
            </Grid>
            <Grid display={'flex'} gap={1}>
              <Email color="disabled" />
              <Box>
                <Typography variant="caption">Email Address</Typography>
                <Typography>{data!.email}</Typography>
              </Box>
            </Grid>
            <Grid display={'flex'} gap={1}>
              <Phone color="disabled" />
              <Box>
                <Typography variant="caption">Phone No.</Typography>
                <Typography>{data!.phoneNumber}</Typography>
              </Box>
            </Grid>
            <Grid display={'flex'} gap={1}>
              <LocalActivity color="disabled" />
              <Box>
                <Typography variant="caption">Country</Typography>
                <Typography>{data!.country.label}</Typography>
              </Box>
            </Grid>
          </Box>

          <Box p={2}>
            <Typography variant="h6" component="h2" gutterBottom>
              About the Company
            </Typography>
            <Typography variant="subtitle2">{data!.aboutTheCompany}</Typography>
          </Box>
        </Grid>
      </Grid>
    </SubCard>
  );
};

export default ClientTopCard;
