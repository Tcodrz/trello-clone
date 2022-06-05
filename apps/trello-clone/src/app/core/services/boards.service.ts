import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, mergeMap, Observable } from 'rxjs';
import { Board, Card, List } from '@trello-clone/trello-interface';
import { BoardsQuery } from '../../state/boards/board.query';
import { BoardsStore } from '../../state/boards/boards.store';
import { CacheKeys, CacheService } from './cache.service';
import { GotoService } from './goto.service';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
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
  getWorkspaceBoards(workspaceID: string): Observable<Board[]> {
    return this.firestore.collection<Board>('board').get().pipe(
      map(boards => boards.docs.map(b => b.data())),
      map(boards => boards.filter(b => b.workspaceID === workspaceID))
    );
  }
  updateLists(lists: List[]): void {
    const collection = this.firestore.collection<List>('list');
    Promise.all(lists.map(list => collection.doc(list.id).set(list)));
  }
  getBoard(boardID: string): Observable<Board | null> {
    return this.boardsQuery.boards$.pipe(
      map(boards => boards.find(board => board.id === boardID)),
      mergeMap(board => {
        return this.firestore.collection<List>('list').get().pipe(
          map(lists => lists.docs.filter(list => board?.listIDs.includes(list.id))),
          map(lists => lists.map(list => ({ ...list.data(), id: list.id }))),
          map(lists => {
            if (board) board.lists = lists;
            return board ?? null;
          })
        )
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
  getCurrentBoardValue(): Board | null {
    return this.boardsStore.getValue().currentBoard;
  }

}
