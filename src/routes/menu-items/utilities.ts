// assets
import { IMenuProps } from '@/types';
import { IconUsers, IconCode, IconMessage, IconCalendar } from '@tabler/icons-react';

const icons = { IconUsers, IconCode, IconMessage, IconCalendar };

// constant

// ==============================|| DEVS MENU ITEMS ||============================== //
type TUtilities = IMenuProps;

const utilities: TUtilities = {
  id: 'Devs',
  title: 'Devs',
  type: 'group',
  roles: ['Ceo', 'Recruitment'],

  children: [
    {
      id: 'Hub',
      title: 'Dev Hub',
      type: 'item',
      url: '/devs/hub',
      icon: icons.IconCode,
      breadcrumbs: false,
    },
    {
      id: 'Interviews',
      title: 'Dev interviews',
      type: 'item',
      url: '/devs/interviews',
      icon: icons.IconCalendar,
      breadcrumbs: false,
    },
    {
      id: 'Devs',
      title: 'All devs',
      type: 'item',
      url: '/devs/all',
      icon: icons.IconUsers,
      breadcrumbs: false,
    },
  ],
};

export default utilities;
