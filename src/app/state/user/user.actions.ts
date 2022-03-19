import { createAction } from '../types';
import { User } from './user.reducer';

export enum UserActions {
  Login = 'LOGIN',
  Logout = 'LOGOUT',
}

export const Login = createAction<User>(UserActions.Login, 'userState');
export const Logout = createAction<User>(UserActions.Logout, 'userState');


