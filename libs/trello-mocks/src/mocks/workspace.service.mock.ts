// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {WorkspaceService} from "../../../../apps/trello-clone/src/app/core/services/workspace.service";
import {Workspace} from "@trello-clone/trello-interface";
import {of} from "rxjs";

export const MOCK_WORKSPACE: Workspace = {
  id: "1234", name: "mock workspace", userID: "abed123"
}

export type WorkspaceServiceMock = Partial<Record<keyof WorkspaceService, jest.Mock<WorkspaceService>>>;

export function createWorkspaceServiceMock(): WorkspaceServiceMock {
  return {
    getWorkspace: jest.fn().mockReturnValue(MOCK_WORKSPACE),
    getAll: jest.fn(),
    getMenuItems: jest.fn().mockReturnValue(of([{
      headline: '',
      items: [{
        label: 'label',
        id: 'id',
        command: jest.fn()
      }]
    }
    ])),
  };
}
