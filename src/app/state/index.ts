import { BehaviorSubject, map, Observable } from 'rxjs';
import { Login } from './user/user.actions';
import { User, userReducer } from './user/user.reducer';
export interface IAction {
  type: string;
  payload?: any;
  actionType: keyof AppState;
}

export type Reducer = (state: AppState, action: IAction) => AppState;

export class State {
  private readonly _state: BehaviorSubject<AppState>
  constructor(initialState: AppState) {
    this._state = new BehaviorSubject(initialState);
  }
  get state(): Observable<AppState> { return this._state.asObservable(); }
  dispatch(action: IAction) {
    switch (action.actionType) {
      case 'user':
        const state = this._state.getValue();
        const reducer = reducers.get(action.actionType);
        if (!!reducer)
          this._state.next(reducer(state, action));
        break;
    }
  }
  select(key: keyof AppState): Observable<AppState[keyof AppState]> {
    return this._state.asObservable().pipe(
      map(state => state[key])
    );
  }
}

export interface AppState {
  user: User;
}


const reducers = new Map<keyof AppState, Reducer>();
reducers.set('user', userReducer);

