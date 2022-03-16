import { User } from './user.reducer';
import { IAction, AppState } from "..";

class UserAction<T> implements IAction {
  private _actionType: keyof AppState;
  private _type: string;
  private _payload?: T;
  constructor(type: string, payload?: T) {
    this._actionType = 'user';
    this._type = type;
    this._payload = payload;
  }
  get actionType(): keyof AppState { return this._actionType; }
  get type(): string { return this._type; }
  get payload(): any { return this._payload; }
}

function createAction<T>(type: string): (payload: T) => IAction {
  return function (payload: T) {
    const key = Object.keys(payload)[0];
    return new UserAction(type, payload[key as keyof T]);
  }
}

export enum UserActions {
  Login = 'LOGIN',
  Logout = 'LOGOUT',
}

export const Login = createAction<{ payload: User }>(UserActions.Login);
export const Logout = createAction<{ user: User }>(UserActions.Logout);


