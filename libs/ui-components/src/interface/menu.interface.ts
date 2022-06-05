import { Icons } from "../lib/button/icon/icons";
import { Params } from "@angular/router";

export interface MenuItem {
  label: string;
  icon?: Icons;
  command?: (...args: any) => void;
  route?: string;
  routeParams?: Params,
}
export interface MenuItems {
  headline: string;
  items: MenuItem[];
}
