import { Icons } from "@ui-components";

export interface ToolbarItem {
  title: string;
  icon: Icons;
  action?: () => void;
}
