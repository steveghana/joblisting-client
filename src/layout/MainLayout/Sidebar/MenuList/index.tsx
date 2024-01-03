// material-ui
import { Typography } from '@mui/material';
import React from 'react';
// project imports
import NavGroup from './NavGroup';
import menuItem from '../../../../routes/menu-items';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = ({ navTitle }: { navTitle: (title: string) => void }) => {
  const userRole = sessionStorage.getItem('role');
  const filteredSidebarData = menuItem.items.filter((item) => item.roles.includes(userRole as string));
  const navItems = filteredSidebarData.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup navTitle={(title) => navTitle(title)} key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
