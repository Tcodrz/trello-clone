import { createAction } from "../types";
import { Workspace } from "./workspaces.reducer";

export enum WorkspaceActions {
  Load = 'WORKSPACE LOAD',
}

export const Load = createAction<Workspace>(WorkspaceActions.Load, 'workspaceState');
