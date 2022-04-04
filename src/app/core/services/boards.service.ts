import { Card } from './../interface/card.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Board } from '../interface/board.interface';
import { List } from '../interface/list.interface';
import { BoardsQuery } from './../../state/boards/board.query';
import { BoardsStore } from './../../state/boards/boards.store';
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
  init() {
    const currentBoard = this.cache.getItem<Board>(CacheKeys.CurrentBoard);
    if (!!currentBoard) this.boardsStore.update({ currentBoard });
  }
  getBoards(): Observable<Board[]> {
    return this.boardsQuery.boards$;
  }
  updateLists(lists: List[]) {
    const collection = this.firestore.collection<List>('list');
    Promise.all(lists.map(list => collection.doc(list.id).set(list)));
  }
  getCurrentBoard(): Observable<Board | null> {
    return this.boardsQuery.currentBoard$;
  }
  setCurrentBoard(board: Board | null) {
    this.boardsStore.update({ currentBoard: board });
    this.cache.setItem(CacheKeys.CurrentBoard, board);
  }
  createNewBoard(newBoard: Partial<Board>) {
    this.boardsStore.create(newBoard);
    this.goto.board();
  }
  updateListCardsPosition(list: List) {
    const collection = this.firestore.collection<Card>('card');
    Promise.all(list.cards.map(card => collection.doc(card.id).set(card)));
  }
  createCard(c: Partial<Card>) {
    const card: Card = {
      id: this.firestore.createId(),
      ...c
    } as Card;
    this.firestore.doc(`card/${card.id}`).set(card).then(() => {
      this.boardsStore.addCardToList(card);
    });
  }
}
