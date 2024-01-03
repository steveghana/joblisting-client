import * as React from 'react';
import {
  Box,
  BoxProps,
  ButtonBase,
  FormControl,
  FormHelperText,
  IconButton,
  MenuItem,
  Select,
  TextareaAutosize,
  TextareaAutosizeProps,
  Typography,
} from '@mui/material';
import FormatBoldRoundedIcon from '@mui/icons-material/FormatBoldRounded';
import FormatItalicRoundedIcon from '@mui/icons-material/FormatItalicRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import { useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
// import FormHelperText from "@mui/joy/FormHelperText";
// import Textarea from "@mui/joy/Textarea";

export default function EditorToolbar({ sx, ...props }: BoxProps) {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      {...props}
      sx={[
        {
          display: 'flex',
          my: 2,
          alignItems: 'flex-end',
          gap: 0.5,
          '& > button': { '--Icon-fontSize': '16px' },
          flexDirection: {
            lg: 'row',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box>
        <ButtonBase>
          <FormatBoldRoundedIcon />
        </ButtonBase>
        <ButtonBase>
          <FormatItalicRoundedIcon />
        </ButtonBase>
        <ButtonBase>
          <FormatListBulletedRoundedIcon />
        </ButtonBase>
      </Box>
    </Box>
  );
}

export function LargeTextField(props: TextareaAutosizeProps) {
  const [text, setText] = useState('');
  const wordLimit = 300;
  const words = text.trim().split(/\s+/).filter(Boolean).length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    props.onChange && props.onChange(e);
  };

  return (
    <>
      <EditorToolbar />
      <TextareaAutosize
        {...props}
        // size="sm"
        style={{ padding: '.4rem' }}
        minRows={6}
        placeholder="Enter your description here..."
        onChange={handleChange}
      />
      {/* <TextareaAutosize
        style={{ marginTop: 1.5 }}
        minRows={4}
        placeholder="Enter your description here..."
      /> */}
      <Typography variant="caption" fontSize={'.7rem'}>
        {words} words ({wordLimit - words} words left)
      </Typography>
    </>
  );
}
