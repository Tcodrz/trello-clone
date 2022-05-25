import { Icons } from "../lib/button/icon/icons";

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
