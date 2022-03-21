import { Action, Reducer } from '../types';
import { UserActions } from './user.actions';

export interface User {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly picture: string;
}

export interface UserState {
  readonly user: User | null;
}

export const userReducer: Reducer<UserState> = (state: UserState, action: Action<unknown>): UserState => {
  switch (action.type) {
    case UserActions.Login:
      return {
        user: action.payload,
      }
    case UserActions.Logout:
      return {
        user: null
      }
    default: return state;
  }
}

