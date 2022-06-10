import {UserQuery} from "../state/user/user.query";
import {of} from "rxjs";

export type UserQueryMock = Partial<Record<keyof UserQuery, jest.Mock>>;

export function createUserQueryMock(): UserQueryMock {
  return {
    user$: jest.fn(() => of(null))
  }
}
