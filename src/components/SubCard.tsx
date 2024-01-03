import React, { Ref } from 'react';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material';
import { themePalette } from '../themes/schemes/palette';
import { motion } from 'framer-motion';
// ==============================|| CUSTOM SUB CARD ||============================== //
interface ISubCard {
  children: React.ReactNode;
  content?: boolean;
  contentClass?: string;
  darkTitle?: boolean;
  secondary?: string;
  sx?: Record<any, any>;
  contentSX?: Record<any, any>;
  title?: React.ReactNode | string;
}
const SubCard: React.FC<ISubCard> = forwardRef(
  ({ children, content, contentClass, darkTitle, secondary, sx = {}, contentSX = {}, title, ...others }, ref: Ref<HTMLDivElement>) => {
    const theme = useTheme();

    return (
      <motion.div
        key={window.location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Card
          ref={ref}
          sx={{
            border: '2px solid',
            borderColor: themePalette.primary.light,
            ':hover': {
              boxShadow: '0 4px 14px 0 rgb(32 40 45 / 8%)',
            },
            ...sx,
          }}
          // {...others}
        >
          {/* card header and action */}
          {!darkTitle && title && (
            <CardHeader
              sx={{ p: 2 }}
              title={<Typography variant="h5">{title}</Typography>}
              // action={secondary}
            />
          )}
          {darkTitle && title && (
            <CardHeader
              sx={{ p: 2 }}
              title={<Typography variant="h4">{title}</Typography>}
              // action={secondary}
            />
          )}

          {/* content & header divider */}
          {title && (
            <Divider
              sx={{
                opacity: 1,
                borderColor: themePalette.primary.light,
              }}
            />
          )}

          {/* card content */}
          {content && (
            <Grid sx={{ p: { lg: 1.4, sm: 1, xs: 0.5 }, ...contentSX }} className={contentClass || ''}>
              {children}
            </Grid>
          )}
          {!content && children}
        </Card>
      </motion.div>
    );
  },
);

SubCard.defaultProps = {
  content: true,
};

export default SubCard;
