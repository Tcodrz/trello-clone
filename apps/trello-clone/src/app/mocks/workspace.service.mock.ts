import {WorkspaceService} from "../core/services/workspace.service";
import {Workspace} from "../core/interface/workspace.interface";

export const MOCK_WORKSPACE: Workspace = {
  id: "1234", name: "mock workspace", userID: "abed123"
}

export type WorkspaceServiceMock = Partial<Record<keyof WorkspaceService, jest.Mock<WorkspaceService>>>;

export function createWorkspaceServiceMock(): WorkspaceServiceMock {
  return {
    getWorkspace: jest.fn().mockReturnValue(MOCK_WORKSPACE),
    getAll: jest.fn(),
  };
}
