import { Typography } from '@mui/material';
import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';
import React from 'react';

interface IButtonProps extends LoadingButtonProps {
  text?: string; // Add your custom text property
  children?: React.ReactNode | string;
}

/**
 * A custom button component with Material UI's LoadingButton and Typography components.
 * @param props - The properties of the button, including the text to display and any additional props for the LoadingButton component.
 * @returns The custom button component.
 */
function CustomButton(props: IButtonProps) {
  return (
    <LoadingButton
      {...props}
      // fullWidth
      // endIcon={<Loading/>}
      // loadingPosition="end"
      variant={props.variant || 'contained'}
      sx={{
        my: 1,
        boxShadow: 'rgba(79, 172, 255, 0.45) 0px 13px 27px -5px, rgba(79, 172, 255, 0.4) 0px 8px 16px -8px;',
        borderRadius: '10px',
        // color: props.variant === 'outlined' ? 'white' : '',
        minWidth: '50px',
      }}
    >
      <Typography fontSize={'.9rem'} variant="button">
        {props.text}
      </Typography>
      {props.children}
    </LoadingButton>
  );
}

export default CustomButton;
