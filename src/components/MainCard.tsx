import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Card, CardContent, CardHeader, Divider, IconButton, Tooltip, Typography } from '@mui/material';
import { themePalette } from '../themes/schemes/palette';
import { ArrowBackTwoTone } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import pattern from '@/assets/images/auth/auth-pattern-dark.svg';

// constant
const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 },
};

// ==============================|| CUSTOM MAIN CARD ||============================== //
interface IMainCard {
  border?: boolean;
  boxShadow?: boolean;
  children?: React.ReactNode;
  content?: boolean;
  elevation?: number;
  contentClass?: string;
  contentSX?: Record<any, any>;
  darkTitle?: boolean;
  secondary?: React.ReactElement | string | Record<any, any>;
  shadow?: string;
  sx?: Record<any, any>;
  title?: React.ReactElement | string | Record<any, any>;
}
type IAny = {
  ref?: any;
} & IMainCard;
const MainCard: React.FC<IAny> = forwardRef(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentClass = '',
      contentSX = {},
      darkTitle,
      secondary,
      shadow,
      sx = {},
      title,
      ...others
    }: any,
    ref,
  ) => {
    const navigate = useNavigate();

    return (
      <motion.div
        key={window.location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ height: 'auto' }}
        transition={{ duration: 0.3 }}
      >
        <Card
          ref={ref}
          {...others}
          sx={{
            border: border ? '1px solid' : 'none',
            borderColor: themePalette.primary[200] + 25,
            backgroundImage: `linear-gradient(rgba(230, 230, 230, 0.1), rgba(230, 230, 230, 0.1)), url(${pattern})`,
            backgroundSize: 'cover',
            // backgroundImage: `url(${pattern})`,

            ':hover': {
              boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit',
            },
            minHeight: '100%',
            // ...sx,
          }}
        >
          {/* card header and action */}
          {title && (
            <Box display="flex">
              <CardHeader sx={headerSX} title={darkTitle ? <Typography variant="h5">{title}</Typography> : title} action={secondary} />
            </Box>
          )}
          {/* content & header divider */}
          {title && <Divider />}

          {/* card content */}
          {content && (
            <CardContent sx={{ ...contentSX, py: 0, px: 1, minHeight: '100%' }} className={contentClass}>
              {children}
            </CardContent>
          )}
          {!content && children}
        </Card>
      </motion.div>
    );
  },
);

// MainCard.propTypes = {};

export default MainCard;
