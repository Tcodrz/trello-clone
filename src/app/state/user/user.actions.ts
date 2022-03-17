import { Action, AppState } from '../types';
import { User } from './user.reducer';



function createAction<T>(type: string, key: keyof AppState): (payload: T) => Action<T> {
  return function (payload: T): Action<T> {
    return new Action<T>(key, type, payload);
  }
}

export enum UserActions {
  Login = 'LOGIN',
  Logout = 'LOGOUT',
}

export const Login = createAction<User>(UserActions.Login, 'userState');
export const Logout = createAction<User>(UserActions.Logout, 'userState');


