import {of} from "rxjs";
import {UserState, UserStore} from "../state/user/user.store";

export type UserStoreMock = Partial<Record<keyof UserStore, jest.Mock>>;

export function createUserStoreMock(state: UserState): UserStoreMock {
  return {
    update: jest.fn(() => of(state)),
    getValue: jest.fn(() => state)
  }
}
