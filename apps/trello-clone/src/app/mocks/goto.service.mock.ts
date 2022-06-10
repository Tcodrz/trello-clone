// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {GotoService} from "../core/services/goto.service";

export type GotoServiceMock = Partial<Record<keyof GotoService, jest.Mock<GotoService>>>;

export function createGotoServiceMock(): GotoServiceMock {
  return {
    board: jest.fn(),
    dashboard: jest.fn(),
    login: jest.fn(),
    workspace: jest.fn()
  };
}
