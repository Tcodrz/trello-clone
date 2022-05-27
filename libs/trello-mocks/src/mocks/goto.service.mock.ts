// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {GotoService} from "../../../../apps/trello-clone/src/app/core/services/goto.service";

export type GotoServiceMock = Partial<Record<keyof GotoService, jest.Mock<GotoService>>>;

export function createGotoServiceMock(): GotoServiceMock {
  return {
    board: jest.fn(),
    dashboard: jest.fn()
  };
}
