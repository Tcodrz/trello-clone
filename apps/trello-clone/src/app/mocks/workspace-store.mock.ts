import {WorkspacesState, WorkspaceStore} from "../state/workspaces/workspaces.store";

export type WorkspaceStoreMock = Partial<Record<keyof WorkspaceStore, jest.Mock>>;

export function createWorkspaceStoreMock(state: WorkspacesState): WorkspaceStoreMock {
  return {
    update: jest.fn(),
    getValue: jest.fn(() => state),
    init: jest.fn(),
    setCurrentWorkspaceByID: jest.fn(),
    setCurrentWorkspace: jest.fn()
  }
}
