import PropTypes from 'prop-types';
import React from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, List, Typography } from '@mui/material';

// project imports
import NavItem from '../NavItem';
// import NavCollapse from '../NavCollapse';
import { themeTypography } from '../../../../../themes/schemes/typography';
// themeTypography
// ==============================|| SIDEBAR MENU LIST GROUP ||============================== //

const NavGroup = ({ item, navTitle }: INavgroup) => {
  const theme = useTheme();

  // menu list collapse & items
  const items = item.children?.map((menu: any) => {
    switch (menu.type) {
      // case 'collapse':
      //   return <NavCollapse key={menu.id} menu={menu} level={1} />;
      case 'item':
        return <NavItem navTitle={(title) => navTitle(title)} key={menu.id} item={menu} level={1} />;
      default:
        return (
          <Typography key={menu.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return (
    <>
      <List
        subheader={
          item.title && (
            <Typography variant="caption" sx={{ ...themeTypography.menuCaption }} display="block" gutterBottom>
              {item.title}
              {item.caption && (
                <Typography variant="caption" sx={{ ...themeTypography.subMenuCaption }} display="block" gutterBottom>
                  {item.caption}
                </Typography>
              )}
            </Typography>
          )
        }
      >
        {items}
      </List>

      {/* group divider */}
      <Divider sx={{ mt: 0.25, mb: 1.25 }} />
    </>
  );
};

interface INavgroup {
  item: Record<any, any>;
  navTitle: (value: string) => void;
}

export default NavGroup;
