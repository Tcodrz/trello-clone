import {ModalService} from "@ui-components";
import {of} from "rxjs";

export type ModalServiceMock = Partial<Record<keyof ModalService, jest.Mock>>;

export function createModalServiceMock(): ModalServiceMock {
  return {
    open: jest.fn(),
    config: jest.fn(() => of(() => {
      return {
        cbOnClose: jest.fn()
      }
    }))
  };
}
