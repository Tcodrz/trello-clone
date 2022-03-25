import { Link } from 'src/app/core/interface/link.interface';
import { Icons } from '../../ui-components/button/icon/icon.component';
import { MenuItem } from '../../ui-components/menu/menu/menu.component';

export const dashboardSidebarLinks: Link[] = [
  {
    label: 'Boards',
    route: '/dashboard/boards',
    icon: Icons.ClipBoard
  },
  {
    label: 'Templates',
    route: '/dashboard/templates',
    icon: Icons.BorderAll
  },
  {
    label: 'Home',
    route: '/dashboard/home',
    icon: Icons.Home
  }
];

export const workspaceMenuItems: MenuItem[] = [
  {
    label: 'Boards',
    icon: Icons.ClipBoard
  },
  {
    label: 'Highlights',
    icon: Icons.Heart,
  },
  {
    label: 'Views',
    icon: Icons.BorderAll,
  },
  {
    label: 'Members',
    icon: Icons.Users
  },
  {
    label: 'Settings',
    icon: Icons.Settings,
  }
]
