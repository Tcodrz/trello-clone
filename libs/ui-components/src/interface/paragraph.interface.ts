import {UiButton} from "./ui-button.interface";
import {ChipConfig} from "../lib/ui-chip/chip-config.interface";

export interface Paragraph {
  title: string;
  text: string;
  dividerBottom?: boolean;
  dividerTop?: boolean;
  textLink?: UiButton;
  chipConfig?: ChipConfig;
}
