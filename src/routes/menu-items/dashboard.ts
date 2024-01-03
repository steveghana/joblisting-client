// assets
import { IconDashboard, IconUser } from '@tabler/icons-react';
import { IconBuilding, IconUsers, IconBriefcase } from '@tabler/icons-react';
import { Business, Work } from '@mui/icons-material';
import { IMenuProps } from '@/types';

// constant
const icons = { IconDashboard, IconUser, IconBuilding, IconBriefcase };

// ==============================|| DASHBOARD & CLIENTS MENU ITEMS ||============================== //

type Dashboard = IMenuProps;
const dashboard: Dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  roles: ['Ceo', 'Recruitment'],
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
    {
      id: 'client',
      title: 'Clients',
      type: 'item',
      url: '/dashboard/customers/clients',
      icon: icons.IconBuilding,
      breadcrumbs: false,
    },
    {
      id: 'roles',
      title: 'Roles',
      type: 'item',
      url: '/dashboard/roles/jobs',
      icon: icons.IconBriefcase,
      breadcrumbs: false,
    },
  ],
};

export default dashboard;
