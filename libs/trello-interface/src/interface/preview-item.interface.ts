import { Theme } from "@trello-clone/trello-interface";

export interface PreviewItem {
  name: string;
  theme?: Theme | undefined;
  action?: () => void
}
