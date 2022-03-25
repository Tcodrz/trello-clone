import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from '.';
import { Workspace } from '../core/interface/workspace.interface';
import { AppState } from './types';
import { User } from './user/user.reducer';


@Injectable({
  providedIn: 'root'
})
export class StateService {
  private currentWorkspace$: BehaviorSubject<Workspace | null> = new BehaviorSubject<Workspace | null>(null);
  private user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private workspaces$: BehaviorSubject<Workspace[]> = new BehaviorSubject<Workspace[]>([]);
  constructor() { }
  loadWorkspace(workspace: Workspace) {
    this.currentWorkspace$.next(workspace);
  }
  setUser(user: User | null) {
    this.user$.next(user);
  }
  setWorkspaces(workspaces: Workspace[]) {
    this.workspaces$.next(workspaces);
  }
  getUser(): Observable<User | null> {
    return this.user$.asObservable();
  }
  getWorkspaces(): Observable<Workspace[]> {
    return this.workspaces$.asObservable();
  }
  getCurrentWorkspace(): Observable<Workspace | null> {
    return this.currentWorkspace$.asObservable();
  }
}
