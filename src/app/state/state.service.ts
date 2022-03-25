import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Board } from '../core/interface/board.interface';
import { User } from '../core/interface/user.interface';
import { Workspace } from '../core/interface/workspace.interface';


@Injectable({
  providedIn: 'root'
})
export class StateService {
  private currentWorkspace$: BehaviorSubject<Workspace | null> = new BehaviorSubject<Workspace | null>(null);
  private currentBoard$: BehaviorSubject<Board | null> = new BehaviorSubject<Board | null>(null);
  private user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private workspaces$: BehaviorSubject<Workspace[]> = new BehaviorSubject<Workspace[]>([]);
  private boards$: BehaviorSubject<Board[]> = new BehaviorSubject<Board[]>([]);
  constructor() { }
  loadWorkspace(workspace: Workspace | null) {
    this.currentWorkspace$.next(workspace);
  }
  loadBoard(board: Board | null) {
    this.currentBoard$.next(board);
  }
  setUser(user: User | null) {
    this.user$.next(user);
  }
  setWorkspaces(workspaces: Workspace[]) {
    this.workspaces$.next(workspaces);
  }
  setBoards(boards: Board[]) {
    this.boards$.next(boards);
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
  getBoards(): Observable<Board[]> {
    return this.boards$.asObservable();
  }
  getCurrentBoard(): Observable<Board | null> {
    return this.currentBoard$.asObservable();
  }
}
