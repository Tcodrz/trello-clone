import { Injectable } from '@angular/core';
import { Store } from '.';
import { AppState } from './types';


@Injectable({
  providedIn: 'root'
})
export class StoreService extends Store<AppState> {

  constructor() {
    super({} as AppState);
  }


}
