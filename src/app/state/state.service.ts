import { Injectable } from '@angular/core';
import { AppState, State } from '.';
import { Login } from './user/user.actions';








@Injectable({
  providedIn: 'root'
})
export class StateService extends State {

  constructor() {
    super({} as AppState);
  }


}
