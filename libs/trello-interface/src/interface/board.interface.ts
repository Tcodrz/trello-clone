import { List } from "./list.interface";
import { Theme } from './themes';
import { User } from './user.interface';


export interface Board {
  id: string;
  name: string;
  workspaceID: string;
  listIDs: string[];
  lists?: List[];
  createdAt: number;
  updatedAt: number;
  theme: Theme;
  members: User[];
}
