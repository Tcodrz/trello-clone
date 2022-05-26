import {UserService} from "../core/services/user.service";
import {User} from "../core/interface/user.interface";
import {of} from "rxjs";

const MOCK_USER: User = {
  email: "mock@email.com",
  id: "mock id",
  name: "mock user",
  picture: "http://user-image.com"
}

export type UserServiceMock = Partial<Record<keyof UserService, jest.Mock<UserService>>>;

export function createUserServiceMock(): UserServiceMock {
  return {
    signInWithGoogle: jest.fn(),
    getUser: jest.fn().mockReturnValue(of(MOCK_USER))
  };
}
