import {BoardsService} from "../core/services/boards.service";

export type BoardsServiceMock = Partial<Record<keyof BoardsService, jest.Mock<BoardsService>>>;

export function createBoardsServiceMock(): BoardsServiceMock {
  return {
    getBoards: jest.fn(),
    createNewBoard: jest.fn(),
  };
}
