import {CardService} from "../core/services/card.service";
import {of} from "rxjs";

export type CardServiceMock = Partial<Record<keyof CardService, jest.Mock>>;

export function createCardServiceMock(): CardServiceMock {
  return {
    saveCard: jest.fn(),
    getCard: jest.fn(() => of(null))
  }
}
