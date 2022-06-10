import {ListsState, ListsStore} from "../state/lists/lists.store";
import {of} from "rxjs";

export type ListStoreMock = Partial<Record<keyof ListsStore, jest.Mock>>;

export function createListStoreMock(state: ListsState): ListStoreMock {
  return {
    update: jest.fn(() => of(state)),
    getValue: jest.fn(() => state),
    createCard: jest.fn()
  };
}
