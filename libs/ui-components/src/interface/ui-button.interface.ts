import {Icons} from "../lib/button/icon/icons";

export interface UiButton {
  text: string;
  action: (params?: unknown) => void;
  icon?: Icons;
  className?: string;
}
