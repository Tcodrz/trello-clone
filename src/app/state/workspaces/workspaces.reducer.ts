import { Action, Reducer } from "../types";
import { WorkspaceActions } from "./workspaces.actions";

export interface Workspace {
  name: string;
}

export interface WorkspaceState {
  currentWorkSpace: Workspace | null;
  allWorkspaces: Workspace[];
}

export const workspaceReducer: Reducer<WorkspaceState> = (state: WorkspaceState, action: Action<unknown>): WorkspaceState => {
  switch (action.type) {
    case WorkspaceActions.Load:
      return {
        currentWorkSpace: action.payload,
        allWorkspaces: [...state.allWorkspaces]
      }
    default: return state;
  }
}
