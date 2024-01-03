/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Card, { CardProps } from '@mui/material/Card';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import { Box, styled } from '@mui/material';
const UploadInput = styled('input')({
  display: 'none',
});
export default function DropZone({
  icon,
  sx,
  ...props
}: CardProps & {
  icon?: React.ReactElement;
}) {
  return (
    <Card
      variant="elevation"
      {...props}
      sx={[
        {
          borderRadius: 'sm',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          alignItems: 'center',
          px: 3,
          flexGrow: 1,
          boxShadow: 'none',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        sx={{
          minWidth: 32,
          borderRadius: '50%',
          fontSize: '16px',
        }}
      >
        <div>{icon ?? <FileUploadRoundedIcon />}</div>
      </Box>

      <Typography textAlign="center">
        <UploadInput accept="image/*" id="icon-button-file" name="icon-button-file" type="file" />
        <Link component="button" variant="subtitle2">
          Click to upload
        </Link>{' '}
        or drag and drop
        <br /> SVG, PNG, JPG or GIF (max. 800x400px)
      </Typography>
    </Card>
  );
}
