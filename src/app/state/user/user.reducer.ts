import { Action, Reducer } from '../types';
import { UserActions } from './user.actions';

export interface User {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly picture: string;
}

export interface UserState {
  readonly user: User;
  readonly isLoggedIn: boolean;
}

export const userReducer: Reducer<UserState> = (state: UserState, action: Action<unknown>): UserState => {
  switch (action.type) {
    case UserActions.Login:
      return {
        user: action.payload,
        isLoggedIn: true,
      }
    case UserActions.Logout:
      return {
        user: action.payload,
        isLoggedIn: false
      }
    default: return state;
  }
}

