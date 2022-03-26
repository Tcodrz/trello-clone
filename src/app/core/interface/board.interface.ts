import { List } from "./list.interface";

export interface Board {
  id: string;
  name: string;
  workspaceID: string;
  listIDs: string[];
  lists?: List[];
  createdAt: number;
  updatedAt: number;
}
