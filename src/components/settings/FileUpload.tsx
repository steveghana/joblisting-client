import * as React from 'react';
// import AspectRatio from "@mui/material/AspectRatio";
import Box from '@mui/material/Box';
import Card, { CardProps } from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import { AddBoxOutlined } from '@mui/icons-material';
import { themePalette } from '@/themes/schemes/palette';

export default function FileUpload({
  icon,
  fileName,
  fileSize,
  progress,
  sx,
  ...props
}: CardProps & {
  icon?: React.ReactElement;
  fileName: string;
  fileSize: string;
  progress: number;
}) {
  return (
    <Card
      variant="outlined"
      // orientation="horizontal"
      {...props}
      sx={[
        {
          gap: 1.5,
          alignItems: 'flex-start',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        display={'flex'}
        justifyContent={'center'}
        sx={{
          minWidth: 32,
          borderRadius: '50%',
          fontSize: '16px',
        }}
      >
        <div>{icon ?? <InsertDriveFileRoundedIcon color="action" />}</div>
      </Box>
      <CardContent>
        <Typography fontSize="sm">{fileName}</Typography>
        <Typography>{fileSize}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LinearProgress
            // color="neutral"
            value={progress}
            variant="determinate"
            sx={[
              {
                ...(progress >= 100 && {
                  color: themePalette.success.main,
                }),
              },
            ]}
          />
          <Typography fontSize="xs">{progress}%</Typography>
        </Box>
      </CardContent>
      {progress >= 100 ? (
        <Box
          sx={{
            minWidth: 20,
            borderRadius: '50%',
            fontSize: '14px',
          }}
        >
          <div>
            <CheckRoundedIcon />
          </div>
        </Box>
      ) : (
        <IconButton sx={{ mt: -1, mr: -1 }}>
          <RemoveCircleOutlineRoundedIcon />
        </IconButton>
      )}
    </Card>
  );
}
