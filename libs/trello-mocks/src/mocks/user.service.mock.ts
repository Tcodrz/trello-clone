// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {UserService} from "../../../../apps/trello-clone/src/app/core/services/user.service";
import {User} from "@trello-clone/trello-interface";
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
