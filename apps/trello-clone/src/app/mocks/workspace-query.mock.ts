import {WorkspacesQuery} from "../state/workspaces/workspace.query";
import {of} from "rxjs";

export type WorkspaceQueryMock = Partial<Record<keyof WorkspacesQuery, jest.Mock>>;

export function createWorkspaceQueryMock(): WorkspaceQueryMock {
  return {
    workspaces$: jest.fn(() => of([])),
    currentWorkspace$: jest.fn(() => of(null))
  };
}
