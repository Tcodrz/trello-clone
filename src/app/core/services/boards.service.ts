import { ThemeSquares } from './../interface/themes';
import { Card } from './../interface/card.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, mergeMap, Observable, of, switchMap } from 'rxjs';
import { Board } from '../interface/board.interface';
import { Action, StateService } from './../../state/state.service';
import { List } from '../interface/list.interface';
import { CacheKeys, CacheService } from './cache.service';
import { GotoService } from './goto.service';
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
    const cardsCollection = this.firestore.collection<Card>('card');
    const listCollection = this.firestore.collection<List>('list');
    this.logger.logAction({ action: Action.BoardLoad, value: this });
    return this.state.getCurrentBoard().pipe(
      mergeMap(board => {
        if (!!board) {
          return listCollection.get().pipe(map(ref => {
            const lists = ref.docs.map(list => ({ ...list.data() as List, id: list.id }))
              .filter(list => board.listIDs.includes(list.id));
            board.lists = lists.sort((a, b) => a.position - b.position);
            return board;
          }));
        }
        return of(board);
      }),
      mergeMap((board) => {
        return cardsCollection.get().pipe(
          map(cards => {
            const filteredCards = cards.docs.filter(c => board?.listIDs.includes(c.data().listID));
            board?.lists?.forEach(list => {
              list.cards = filteredCards
                .filter(c => c.data().listID === list.id)
                .map(c => ({ ...c.data() as Card, id: c.id }))
                .sort((a, b) => a.position - b.position);
            });
            return board;
          })
        )
      })
    );
  }
  setCurrentBoard(board: Board | null) {
    this.state.boardSetCurrent(board);
  }
  createNewBoard(newBoard: Partial<Board>) {
    const id = this.firestore.createId();
    const lists = this.initNewBoardCards();
    const listIDs: string[] = lists.map(x => x.id);
    Promise.all(lists.map(list => this.firestore.doc(`list/${list.id}`).set(list)))
      .then(() => {
        const board: Board = {
          ...newBoard, id,
          listIDs: listIDs,
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
        } as Board;
        this.firestore.doc<Board>(`board/${id}`).set(board);
        this.state.boardSetCurrent(board);
        this.workspaceService.setCurrentWorkspaceByID(board.workspaceID);
        this.goto.board();
      })
  }
  initNewBoardCards(): List[] {
    const cards: List[] = [
      {
        id: this.firestore.createId(),
        name: 'Todo',
        position: 1,
        cards: [],
      },
      {
        id: this.firestore.createId(),
        name: 'Doing',
        position: 2,
        cards: [],
      },
      {
        id: this.firestore.createId(),
        name: 'Done',
        position: 3,
        cards: [],
      }
    ];
    cards.forEach(card => {
      this.firestore.doc(`card/${card.id}`).set(card);
    });
    return cards;
  }
}
