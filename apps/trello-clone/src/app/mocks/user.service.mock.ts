import {UserService} from "../core/services/user.service";

export type UserServiceMock = Partial<Record<keyof UserService, jest.Mock<UserService>>>;

export function createUserServiceMock(): UserServiceMock {
  return {
    signInWithGoogle: jest.fn()
  };
}
