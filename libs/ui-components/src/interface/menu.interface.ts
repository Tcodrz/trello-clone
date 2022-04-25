import { Icons } from 'projects/ui-components/src/lib/button/icon/icons';

export interface MenuItem {
  label: string;
  icon?: Icons;
  command?: (...args: any) => void;
  route?: string;
}
export interface MenuItems {
  headline: string;
  items: MenuItem[];
}

export type MenuPosition = 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'mid-right' | 'mid-left';
