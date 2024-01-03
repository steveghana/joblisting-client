import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Card, Divider, Grid, Typography } from '@mui/material';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import HomeIcon from '@mui/icons-material/Home';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import { MarkAsUnread } from '@mui/icons-material';
import { gridSpacing } from '../../store/constant';
import { themePalette } from '../../themes/schemes/palette';
import { useTypedSelector } from '@/store';
import { IMenuProps } from '@/types';

const linkSX = {
  display: 'flex',
  color: 'grey.900',
  textDecoration: 'none',
  alignContent: 'center',
  alignItems: 'center',
};

interface IBreadCrumps {
  card?: boolean;
  divider?: boolean;
  icon?: boolean;
  icons?: boolean;
  maxItems?: number;
  navigation: Record<any, any>;
  rightAlign?: boolean;
  separator?: any;
  title?: boolean;
  titleBottom?: boolean;
  sidebarTitle?: string;
}
// ==============================|| BREADCRUMBS ||============================== //

const Breadcrumbs = ({
  card,
  divider,
  icon,
  icons,
  maxItems,
  navigation,
  sidebarTitle,
  rightAlign,
  separator,
  title,
  titleBottom,
  ...others
}: IBreadCrumps) => {
  const state = useTypedSelector((state) => state.customization);
  console.log(sidebarTitle, 'this is the clickable sidebar title');
  const theme = useTheme();

  const iconStyle = {
    marginRight: theme.spacing(0.75),
    marginTop: `-${theme.spacing(0.25)}`,
    width: '1rem',
    height: '1rem',
    color: theme.palette.primary.main,
  };

  const [main, setMain] = useState<{
    type: string;
    title: string;
    icon: string;
  }>();
  const [item, setItem] = useState<{
    type: string;
    title: string;
    icon: string;
    breadcrumbs: boolean;
  }>();

  // set active item state
  const getCollapse = (menu: IMenuProps) => {
    if (menu.children) {
      menu.children.filter((collapse) => {
        if (collapse.type && collapse.type === 'item') {
          // if (document.location.pathname === config.basename + collapse.url) {
          setMain(menu as IMenuProps & { icon: any });
          setItem(collapse);
          // }
        }
        return false;
      });
    }
  };

  useEffect(() => {
    navigation?.items?.map((menu: IMenuProps) => {
      if (menu.type && menu.type === 'group') {
        getCollapse(menu);
      }
      return false;
    });
  });
  const SeparatorIcon = separator;
  const separatorIcon = separator ? <SeparatorIcon stroke={1.5} size="1rem" /> : <MarkAsUnread />;
  let mainContent;
  let itemContent;
  let breadcrumbContent = <Typography />;
  let itemTitle = '';
  let CollapseIcon;
  let ItemIcon;
  if (main && main.type === 'collapse') {
    CollapseIcon = main.icon ? main.icon : AccountTreeTwoToneIcon;
    mainContent = (
      <Typography component={Link} to="#" variant="subtitle1" sx={linkSX}>
        {icons && <CollapseIcon style={iconStyle} />}
        {main.title}
      </Typography>
    );
  }
  if (item && item.type === 'item') {
    itemTitle = sidebarTitle as string;

    ItemIcon = item.icon ? item.icon : AccountTreeTwoToneIcon;
    itemContent = (
      <Typography
        variant="subtitle1"
        sx={{
          display: 'flex',
          textDecoration: 'none',
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        {icons && <ItemIcon style={iconStyle} />}
        {itemTitle}
      </Typography>
    );

    // main
    if (item.breadcrumbs !== false) {
      breadcrumbContent = (
        <Card
          sx={{
            marginBottom: card === false ? 0 : theme.spacing(gridSpacing),
            border: card === false ? 'none' : '1px solid',
            borderColor: themePalette.primary[200] + 75,
            background: card === false ? 'transparent' : theme.palette.background.default,
          }}
          {...others}
        >
          <Box sx={{ p: 1.4, pl: card === false ? 0 : 2 }}>
            <Grid
              container
              direction={rightAlign ? 'row' : 'column'}
              justifyContent={rightAlign ? 'space-between' : 'flex-start'}
              alignItems={rightAlign ? 'center' : 'flex-start'}
              spacing={1}
            >
              {title && !titleBottom && (
                <Grid item>
                  <Typography variant="h4" sx={{ fontWeight: 500 }}>
                    {itemTitle}
                  </Typography>
                </Grid>
              )}
              <Grid item>
                <MuiBreadcrumbs
                  sx={{
                    '& .MuiBreadcrumbs-separator': {
                      width: 16,
                      ml: 1.25,
                      mr: 1.25,
                    },
                  }}
                  aria-label="breadcrumb"
                  maxItems={maxItems || 8}
                  separator={separatorIcon}
                >
                  <Typography component={Link} to="/" color="inherit" variant="subtitle1" sx={linkSX}>
                    {icons && <HomeTwoToneIcon sx={iconStyle} />}
                    {icon && <HomeIcon sx={{ ...iconStyle, mr: 0 }} />}
                    {!icon && 'Dashboard'}
                  </Typography>
                  {mainContent}
                  {itemContent}
                </MuiBreadcrumbs>
              </Grid>
            </Grid>
          </Box>
        </Card>
      );
    }
  }

  return breadcrumbContent;
};

export default Breadcrumbs;
