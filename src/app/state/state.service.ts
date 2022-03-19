import { Injectable } from '@angular/core';
import { Store } from '.';
import { AppState } from './types';


@Injectable({
  providedIn: 'root'
})
export class StoreService extends Store<AppState> {

  constructor() {
    const initialState: AppState = {
      userState: {
        user: { name: '', id: '', email: '', picture: '' },
        isLoggedIn: false,
      },
      workspaceState: {
        allWorkspaces: [
          { name: 'First Workspace' },
          { name: 'Second Workspace' },
        ],
        currentWorkSpace: null,
      }
    }
    super(initialState);
  }

}
