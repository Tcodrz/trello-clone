import { workspaceReducer } from './workspaces/workspaces.reducer';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Action, AppState, Reducer } from './types';
import { userReducer } from './user/user.reducer';


export class Store<T> {
  private readonly _state: BehaviorSubject<T>
  constructor(initialState: T) {
    this._state = new BehaviorSubject(initialState);
  }
  get(): Observable<T> { return this._state.asObservable(); }
  dispatch<K>(action: Action<K>) {
    const state = this._state.getValue();
    const reducer = reducers.get(action.actionType);
    if (!!reducer) {
      console.log(action);
      const nextState = reducer(state[action.actionType as keyof T], action);
      this._state.next({ ...state, [action.actionType]: nextState });
      console.log(this._state.value);
    }
  }
  select(key: keyof T): Observable<T[keyof T]> {
    return this._state.asObservable().pipe(
      map(state => state[key] as T[keyof T])
    );
  }
}


const reducers = new Map<keyof AppState, Reducer<any>>();
reducers.set('userState', userReducer);
reducers.set('workspaceState', workspaceReducer);

