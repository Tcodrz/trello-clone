import {ListsService} from "../core/services/lists.service";
import {of} from "rxjs";

export type ListServiceMock = Partial<Record<keyof ListsService, jest.Mock>>;

export function createListServiceMock(): ListServiceMock {
  return {
    populateCards: jest.fn(() => of(null))
  };
}
