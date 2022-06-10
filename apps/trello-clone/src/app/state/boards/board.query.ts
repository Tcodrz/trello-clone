import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { Board } from '@trello-clone/trello-interface';
import { BoardsStore, BoardState } from './boards.store';


@Injectable({ providedIn: 'root' })
export class BoardsQuery extends Query<BoardState> {
  boards$: Observable<Board[]> = this.select('boards');
  currentBoard$: Observable<Board | null> = this.select('currentBoard');
  constructor(protected override store: BoardsStore) {
    super(store);
  }
}
