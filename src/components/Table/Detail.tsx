import { Box, Chip, Grid, ListItemIcon, Typography } from '@mui/material';
import { MRT_Row } from 'material-react-table';
import React from 'react';
import { IDev } from '../../types/devs';
import { ApplicantsSubmission } from '../../types/roles';
import { Email } from './RowAction';
import { Send } from '@mui/icons-material';
import CustomButton from '../button';

function TableDetail({ row }: { row: MRT_Row<ApplicantsSubmission> }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Grid lg={6}>
        <Typography variant="h6" component={'legend'}>
          Skills:
        </Typography>
        <Box display={'flex'} gap={1} my={1}>
          {row?.original?.selectedSkills?.map((skill, i) => (
            <Chip key={i} variant="outlined" size="small" color="default" label={skill} />
          ))}
        </Box>
        <ListItemIcon>
          <CustomButton text="Send email" endIcon={<Send />} />
        </ListItemIcon>
      </Grid>
      <Grid maxWidth={'50%'} sx={{ textAlign: 'left' }}>
        <Typography variant="h6">Cover letter:</Typography>
        <Typography variant="caption">&quot;{row.original.coverLetter}&quot;</Typography>
      </Grid>
    </Box>
  );
}

export default TableDetail;
