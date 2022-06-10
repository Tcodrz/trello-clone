// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {BoardsService} from "../core/services/boards.service";
import {Board, Theme} from "@trello-clone/trello-interface";
import {of} from "rxjs";

export const MOCK_BOARD: Board = {
  createdAt: 1234,
  id: "1234",
  listIDs: ['1234', '5678', '3690'],
  members: [],
  name: "mock board",
  theme: {} as Theme,
  updatedAt: 1234,
  workspaceID: "1234"
}

export type BoardsServiceMock = Partial<Record<keyof BoardsService, jest.Mock>>;

export function createBoardsServiceMock(): BoardsServiceMock {
  return {
    getBoards: jest.fn(() => of([MOCK_BOARD])),
    createNewBoard: jest.fn(),
    getBoard: jest.fn(() => of(MOCK_BOARD)),
    updateListCardsPosition: jest.fn(),
    getWorkspaceBoards: jest.fn(() => of([]))
  };
}
