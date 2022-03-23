import { Workspace } from "src/app/core/interface/workspace.interface";
import { createAction } from "../types";

export enum WorkspaceActions {
  Load = 'WORKSPACE LOAD',
}

export const Load = createAction<Workspace>(WorkspaceActions.Load, 'workspaceState');
