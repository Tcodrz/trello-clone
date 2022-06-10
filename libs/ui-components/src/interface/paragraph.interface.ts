import {UiButton} from "./ui-button.interface";

export interface Paragraph {
  title: string;
  text: string;
  dividerBottom?: boolean;
  dividerTop?: boolean;
  textLink?: UiButton;
}
