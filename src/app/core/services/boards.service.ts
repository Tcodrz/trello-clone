import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, mergeMap, Observable, of } from 'rxjs';
import { Board } from '../interface/board.interface';
import { List } from '../interface/list.interface';
import { BoardsQuery } from './../../state/boards/board.query';
import { BoardsStore } from './../../state/boards/boards.store';
import { Card } from './../interface/card.interface';
import { CacheKeys, CacheService } from './cache.service';
import { GotoService } from './goto.service';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  private _boards: Map<string, Board> = new Map<string, Board>();

  constructor(
    private boardsQuery: BoardsQuery,
    private boardsStore: BoardsStore,
    private cache: CacheService,
    private firestore: AngularFirestore,
    private goto: GotoService,
  ) { }
  getBoards(workspaceID: string): Observable<Board[]> {
    this.boardsStore.init(workspaceID);
    return this.boardsQuery.boards$;
  }
  updateLists(lists: List[]): void {
    const collection = this.firestore.collection<List>('list');
    Promise.all(lists.map(list => collection.doc(list.id).set(list)));
  }
  getCurrentBoard(): Observable<Board | null> {
    return this.boardsQuery.currentBoard$.pipe(
      mergeMap(board => {
        if (!board) return of(null);
        const boardCache = this._boards.get(board.id);
        if (boardCache) return of(boardCache) as Observable<Board>;
        else return this.populateBoardLists(board);
      })
    );
  }
  getBoard(boardID: string): Observable<Board | null> {
    return this.boardsQuery.boards$.pipe(
      map(boards => boards.find(board => board.id === boardID)),
      map(board => board ?? null)
    );
  }
  populateBoardLists(board: Board): Observable<Board> {
    return this.firestore.collection<Card>('card').get().pipe(
      map(cards => cards.docs.filter(c => board.listIDs.includes(c.data().listID))),
      map(cards => cards.map(card => ({ ...card.data(), id: card.id }))),
      map(cards => {
        if (board && board.lists)
          board.lists = board.lists.map(list => {
            const listCards = cards
              .filter(card => card.listID === list.id)
              .sort((a, b) => a.position - b.position);
            return {
              ...list,
              cards: listCards,
            };
          });
        return board;
      })
    );
  }
  setCurrentBoard(board: Board | null): void {
    this.boardsStore.update({ currentBoard: board });
    this.cache.setItem(CacheKeys.CurrentBoard, board);
  }
  createNewBoard(newBoard: Partial<Board>): void {
    this.boardsStore.create(newBoard).then((board) => this.goto.board(board.id, board.workspaceID));
  }
  updateListCardsPosition(list: List): void {
    const collection = this.firestore.collection<Card>('card');
    Promise.all(list.cards.map(card => collection.doc(card.id).set(card)));
    this.boardsStore.update(state => {
      const current = state.currentBoard;
      if (current && current.lists) {
        const listIndex = current.lists.findIndex(l => l.id === list.id);
        if (listIndex > -1) current.lists[listIndex] = list;
      }
      return {
        ...state,
        currentBoard: current
      };
    })
  }
  createCard(c: Partial<Card>): void {
    const card: Card = {
      id: this.firestore.createId(),
      ...c
    } as Card;
    this.firestore.doc(`card/${card.id}`).set(card).then(() => {
      this.boardsStore.addCardToList(card);
    });
  }
  getCurrentBoardValue(): Board | null {
    return this.boardsStore.getValue().currentBoard;
  }

}
