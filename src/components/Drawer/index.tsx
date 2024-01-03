import React from 'react';
import { Box, Drawer, useMediaQuery, useTheme } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';

type ICustomDrawer = {
  children: React.ReactElement;
  component: React.ReactElement;
  openDrawer: {
    right: boolean;
  };
  setOpenDrawer: React.Dispatch<
    React.SetStateAction<{
      right: boolean;
    }>
  >;
};
const CustomDrawer = (props: ICustomDrawer) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const list = () => (
    <Box
      sx={{ width: 'auto' }}
      px={2.5}
      py={2}
      role="presentation"
      onClick={() => props.setOpenDrawer({ ...props.openDrawer, ['right']: false })}
      onKeyDown={() => props.setOpenDrawer({ ...props.openDrawer, ['right']: false })}
    >
      {props.component}
    </Box>
  );

  return (
    <>
      <Drawer anchor={'right'} open={props.openDrawer['right']} onClose={() => props.setOpenDrawer({ ...props.openDrawer, ['right']: false })}>
        <Box
          sx={{
            borderRadius: '35px 35px 0 0',
            background: 'white',
          }}
          height={'89vh'}
        >
          <PerfectScrollbar
            component="div"
            style={{
              height: !matchUpMd ? 'calc(89vh - 16px)' : 'calc(89vh - 18px)',
              paddingLeft: '16px',
              paddingRight: '16px',
            }}
          >
            {list()}
          </PerfectScrollbar>
        </Box>
      </Drawer>
      {props.children}
    </>
  );
};
export default CustomDrawer;
