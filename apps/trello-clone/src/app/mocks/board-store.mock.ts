import {BoardsStore, BoardState} from "../state/boards/boards.store";
import {of} from "rxjs";

export type BoardStoreMock = Partial<Record<keyof BoardsStore, jest.Mock>>;

export function createBoardStoreMock(state: BoardState): BoardStoreMock {
  return {
    update: jest.fn(() => of(state))
  }
}
