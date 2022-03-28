import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Board } from '../core/interface/board.interface';
import { User } from '../core/interface/user.interface';
import { Workspace } from '../core/interface/workspace.interface';
import { Card } from './../core/interface/card.interface';
import { CacheKeys, CacheService } from './../core/services/cache.service';


@Injectable({
  providedIn: 'root'
})
export class StateService {
  private readonly user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private readonly currentWorkspace$: BehaviorSubject<Workspace | null> = new BehaviorSubject<Workspace | null>(null);
  private readonly currentBoard$: BehaviorSubject<Board | null> = new BehaviorSubject<Board | null>(null);
  private readonly workspaces$: BehaviorSubject<Workspace[]> = new BehaviorSubject<Workspace[]>([]);
  private readonly boards$: BehaviorSubject<Board[]> = new BehaviorSubject<Board[]>([]);
  constructor(
    private cache: CacheService,
  ) { }
  workspaceSetCurrent(workspace: Workspace | null) {
    this.cacheUpdate(CacheKeys.CurrentWorkspace, workspace);
    if (!!workspace) this.currentWorkspace$.next({ ...workspace as Workspace });
    else this.currentWorkspace$.next(null);
  }
  boardSetCurrent(board: Board | null) {
    this.cacheUpdate(CacheKeys.CurrentBoard, board);
    this.currentBoard$.next(board);
  }
  setUser(user: User | null) {
    this.cacheUpdate(CacheKeys.User, user);
    this.user$.next(user);
  }
  setWorkspaces(workspaces: Workspace[]) {
    this.workspaces$.next(workspaces);
  }
  setBoards(boards: Board[]) {
    this.boards$.next([...boards]);
  }
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
    return this.currentWorkspace$.asObservable();
  }
  getCurrentBoard(): Observable<Board | null> {
    return this.currentBoard$.asObservable();
  }
  addCardToList(card: Card) {
    const currentBoard = this.currentBoard$.getValue();
    const list = currentBoard?.lists?.find(list => list.id === card.listID);
    if (!list) { debugger; return; }
    list.cards = list.cards.concat(card);
    const board = {
      ...currentBoard,
      lists: currentBoard?.lists?.map(x => x.id === list.id ? list : x)
    };
    this.currentBoard$.next(board as Board);
  }

  private cacheUpdate(key: CacheKeys, item: any) {
    if (!item) this.cache.deleteItem(key);
    else this.cache.setItem(key, item);
  }
}
