import { IAction } from './../index';
import { AppState, Reducer } from "..";

export interface User {
  id: string;
  name: string;
}


export const userReducer: Reducer = (state: AppState, action: IAction): AppState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.payload
      }
    case 'LOGOUT':
      return {
        user: action.payload
      }
    default: return state;
  }
}
