import { WorkspaceState } from './workspaces/workspaces.actions';
import { UserState } from './user/user.reducer';

export type Reducer<T> = (state: T, action: Action<unknown>) => T;
export type ActionCreator<T> = (payload: T) => Action<T>;
export class Action<T> {
  private _actionType: keyof AppState;
  private _type: string;
  private _payload?: T;
  constructor(key: keyof AppState, type: string, payload?: T) {
    this._actionType = key;
    this._type = type;
    this._payload = payload;
  }
  get actionType(): keyof AppState { return this._actionType; }
  get type(): string { return this._type; }
  get payload(): any { return this._payload; }
}
export function createAction<T>(type: string, key: keyof AppState): (payload: T) => Action<T> {
  return function (payload: T): Action<T> {
    return new Action<T>(key, type, payload);
  }
}
export interface AppState {
  readonly userState: UserState;
  readonly workspaceState: WorkspaceState;
}
