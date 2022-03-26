import { LogService } from './../core/services/log.service';
import { CacheKeys, CacheService } from './../core/services/cache.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Board } from '../core/interface/board.interface';
import { User } from '../core/interface/user.interface';
import { Workspace } from '../core/interface/workspace.interface';

export enum Action {
  WorkspaceLoad = '[WORKSPACE] LOAD',
  BoardLoad = '[BOARD] LOAD',
  UserSet = '[USER] LOGIN',
  UserGet = '[USER] GET',
  WorkspaceSet = '[WORKSPACES] SET',
  WorkspaceGet = '[WORKSPACES] GET',
  WorkspaceGetByID = '[WORKSPACES] GET BY ID',
  WorkspaceGetCurrent = '[WORKSPACE] GET CURRENT',
  BoardsGetCurrent = '[BOARD] GET CURRENT',
  BoardsSet = '[BOARDS] SET',
  BoardsGet = '[BOARDS] GET',
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private currentWorkspace$: BehaviorSubject<Workspace | null> = new BehaviorSubject<Workspace | null>(null);
  private currentBoard$: BehaviorSubject<Board | null> = new BehaviorSubject<Board | null>(null);
  private user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private workspaces$: BehaviorSubject<Workspace[]> = new BehaviorSubject<Workspace[]>([]);
  private boards$: BehaviorSubject<Board[]> = new BehaviorSubject<Board[]>([]);
  constructor(
    private cache: CacheService,
  ) { }
  //#region load
  workspaceSetCurrent(workspace: Workspace | null) {
    this.cacheUpdate(CacheKeys.CurrentWorkspace, workspace);
    this.currentWorkspace$.next(workspace);
  }
  boardSetCurrent(board: Board | null) {
    this.cacheUpdate(CacheKeys.CurrentBoard, board);
    this.currentBoard$.next(board);
  }
  //#endregion
  //#region setters
  setUser(user: User | null) {
    this.cacheUpdate(CacheKeys.User, user);
    this.user$.next(user);
  }
  setWorkspaces(workspaces: Workspace[]) {
    this.workspaces$.next(workspaces);
  }
  setBoards(boards: Board[]) {
    this.boards$.next(boards);
  }
  //#endregion
  //#region getters
  getWorkspaces(): Observable<Workspace[]> {
    return this.workspaces$.asObservable();
  }
  getBoards(): Observable<Board[]> {
    return this.boards$.asObservable();
  }
  getUser(): Observable<User | null> {
    return this.user$.asObservable();
  }
  getCurrentWorkspace(): Observable<Workspace | null> {
    return this.currentWorkspace$.asObservable().pipe(
      map(workspace => {
        return workspace;
      })
    );
  }
  getCurrentBoard(): Observable<Board | null> {
    return this.currentBoard$.asObservable();
  }
  //#endregion
  //#region cache utils
  private cacheUpdate(key: CacheKeys, item: any) {
    if (!item) this.cache.deleteItem(key);
    else this.cache.setItem(key, item);
  }
  //#endregion
}
