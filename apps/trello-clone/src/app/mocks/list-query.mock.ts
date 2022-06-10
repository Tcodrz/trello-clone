import {ListsQuery} from "../state/lists/lists.query";
import {of} from "rxjs";

export type ListQueryMock = Partial<Record<keyof ListsQuery, jest.Mock>>;

export function createListQueryMock(): ListQueryMock {
  return {
    lists$: jest.fn(() => of([]))
  };
}
