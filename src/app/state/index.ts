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
    switch (action.actionType) {
      case 'userState':
        const state = this._state.getValue();
        const reducer = reducers.get(action.actionType);
        if (!!reducer)
          this._state.next(reducer(state, action));
        break;
    }
  }
  select(key: keyof T): Observable<T[keyof T]> {
    return this._state.asObservable().pipe(
      map(state => state[key])
    );
  }
}


const reducers = new Map<keyof AppState, Reducer<any>>();
reducers.set('userState', userReducer);

