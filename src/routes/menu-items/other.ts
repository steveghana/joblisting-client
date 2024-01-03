// assets
import { IconHelp, IconStar } from '@tabler/icons-react';
import { CheckCircle } from '@mui/icons-material';
import { IMenuProps } from '@/types';
// constant
const icons = { IconHelp, IconStar };

// ==============================|| HR PAGE & MENU ITEMS ||============================== //
type TOthers = IMenuProps;
const other: TOthers = {
  id: 'Hr',
  title: 'Recruitment',

  type: 'group',
  roles: ['Ceo', 'Recruitment'],

  children: [
    {
      id: 'sample-page',
      title: 'Shortlisted',
      type: 'item',
      url: '/devs/shortlisted',
      icon: icons.IconStar,
      breadcrumbs: false,
    },
    {
      id: 'clockify',
      title: 'Clockify',
      type: 'item',
      icon: icons.IconHelp,
      url: '/devs/clockify',
      breadcrumbs: false,
    },
  ],
};

export default other;
