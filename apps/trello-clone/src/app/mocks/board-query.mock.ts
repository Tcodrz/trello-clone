import {BoardsQuery} from "../state/boards/board.query";
import {of} from "rxjs";

export type BoardQueryMock  = Partial<Record<keyof BoardsQuery, jest.Mock>>;

export function createBoardQueryMock(): BoardQueryMock {
  return {
    boards$: jest.fn(() => of([]))
  }
}
