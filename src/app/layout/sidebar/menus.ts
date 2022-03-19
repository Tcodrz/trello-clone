import { MenuItem } from './../menu/menu.component';
import { Icons } from './../icon/icon.component';
import { Link } from "./sidebar.component";

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
    label: 'settings',
    icon: Icons.Settings,
  }
]
