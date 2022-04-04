import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, mergeMap, Observable, of, switchMap } from 'rxjs';
import { Board } from '../interface/board.interface';
import { List } from '../interface/list.interface';
import { StateService } from './../../state/state.service';
import { CacheKeys, CacheService } from './cache.service';
import { CardService } from './card.service';
import { GotoService } from './goto.service';
import { WorkspaceService } from './workspace.service';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  constructor(
    private cache: CacheService,
    private firestore: AngularFirestore,
    private goto: GotoService,
    private state: StateService,
    private workspaceService: WorkspaceService,
    private cardService: CardService,
  ) { }
  init() {
    const currentBoard = this.cache.getItem<Board>(CacheKeys.CurrentBoard);
    if (!!currentBoard) this.state.boardSetCurrent(currentBoard);
  }
  getBoards(): Observable<Board[]> {
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
  updateBoard(board: Board) {
    const collection = this.firestore.collection<Board>('board');
    collection.doc(board.id).set(board);
  }
  updateLists(lists: List[]) {
    const collection = this.firestore.collection<List>('list');
    Promise.all(lists.map(list => collection.doc(list.id).set(list)));
  }
  getCurrentBoard(): Observable<Board | null> {
    const collection = this.firestore.collection<List>('list');
    return this.state.getCurrentBoard().pipe(
      mergeMap(board => {
        if (!!board) {
          return collection.get().pipe(map(ref => {
            const lists = ref.docs
              .filter(list => board.listIDs.includes(list.id))
              .map(list => ({ ...list.data() as List, id: list.id }))
              .sort((a, b) => a.position - b.position);
            board.lists = lists;
            return board;
          }));
        }
        return of(board);
      }),
      mergeMap((board) => {
        if (!!board) return this.cardService.getCardsByBoard(board as Board).pipe(
          map(cards => {
            if (!!board) board.lists?.forEach(list => list.cards = cards.filter(card => card.listID === list.id));
            return board;
          })
        );
        return of(null);
      }));

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
      });
  }
  private initNewBoardCards(): List[] {
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
