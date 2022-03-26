import { Workspace } from './../interface/workspace.interface';
import { GotoService } from './goto.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, mergeMap, Observable, switchMap } from 'rxjs';
import { Board } from '../interface/board.interface';
import { Action, StateService } from './../../state/state.service';
import { CacheKeys, CacheService } from './cache.service';
import { LogService } from './log.service';
import { WorkspaceService } from './workspace.service';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  constructor(
    private cache: CacheService,
    private firestore: AngularFirestore,
    private goto: GotoService,
    private logger: LogService,
    private state: StateService,
    private workspaceService: WorkspaceService,
  ) { }
  init() {
    const currentBoard = this.cache.getItem<Board>(CacheKeys.CurrentBoard);
    if (!!currentBoard) this.state.boardSetCurrent(currentBoard);
  }
  getBoards(): Observable<Board[]> {
    this.logger.logAction({ action: Action.BoardsGet, value: this });
    const collection = this.firestore.collection<Board>('board');
    return collection.get().pipe(
      map(ref => ref.docs.map(x => ({ ...x.data() as Board, id: x.id }))),
      mergeMap((boards) => this.workspaceService.getCurrentWorkspace().pipe(
        map(workspace => boards.filter(x => x.workspaceID === workspace?.id)),
        map(boards => this.state.setBoards(boards)),
        switchMap(() => this.state.getBoards())
      ))
    );
  }
  getCurrentBoard(): Observable<Board | null> {
    this.logger.logAction({ action: Action.BoardLoad, value: this });
    return this.state.getCurrentBoard();
  }
  setCurrentBoard(board: Board | null) {
    this.state.boardSetCurrent(board);
  }
  createNewBoard(newBoard: Partial<Board>) {
    const id = this.firestore.createId();
    const board: Board = { ...newBoard, id } as Board;
    this.firestore.doc<Board>(`board/${id}`).set(board);
    this.state.boardSetCurrent(board);
    this.workspaceService.setCurrentWorkspaceByID(board.workspaceID);
    this.goto.board();
  }
}
