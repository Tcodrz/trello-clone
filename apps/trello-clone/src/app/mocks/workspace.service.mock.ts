// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {WorkspaceService} from "../core/services/workspace.service";
import {Workspace} from "@trello-clone/trello-interface";
import {of} from "rxjs";

export const MOCK_WORKSPACE: Workspace = {
  id: "1234", name: "mock workspace", userID: "abed123"
}

export type WorkspaceServiceMock = Partial<Record<keyof WorkspaceService, jest.Mock>>;

export function createWorkspaceServiceMock(): WorkspaceServiceMock {
  return {
    getWorkspace: jest.fn(() => of(MOCK_WORKSPACE)),
    getAll: jest.fn(() => of([])),
    getMenuItems: jest.fn(() => of([{
      headline: '',
      items: [{
        label: 'label',
        id: 'id',
        command: jest.fn()
      }]
    }])),
    setCurrentWorkspace: jest.fn()
  };
}
