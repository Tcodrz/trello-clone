import { CacheKeys, CacheService } from './../../core/services/cache.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store, StoreConfig } from '@datorama/akita';
import { map, mergeMap, tap } from 'rxjs';
import { Board } from 'src/app/core/interface/board.interface';
import { List } from 'src/app/core/interface/list.interface';

export interface BoardState {
  boards: Board[];
  currentBoard: Board | null;
}

export function createInitialState(): BoardState {
  return {
    boards: [],
    currentBoard: null,
  };
}
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'boards' })
export class BoardsStore extends Store<BoardState> {
  collection = this.firestore.collection<Board>('board');
  boardsCache: Map<string, Board[]> = new Map();
  constructor(
    private firestore: AngularFirestore,
    private cacheService: CacheService,
  ) {
    super(createInitialState());
  }
  init(workspaceID: string) {
    const boards = this.boardsCache.get(workspaceID);
    if (boards) {
      this.update({ boards });
      return;
    };
    const listCollection = this.firestore.collection<List>('list');
    this.collection.valueChanges().pipe(
      map(boards => boards.filter(board => board.workspaceID === workspaceID)),
      tap(boards => this.boardsCache.set(workspaceID, boards)),
      tap(() => console.log(this.boardsCache)),
      mergeMap(boards => listCollection.get().pipe(
        map(lists => lists.docs.map(list => ({ ...list.data() as List, id: list.id }))),
        map(lists => boards.map(board => ({ ...board, lists: lists.filter(list => board.listIDs.includes(list.id)).sort((a, b) => a.position - b.position) })))
      ))
    ).subscribe(boards => this.update({ boards }))
  }
  create(newBoard: Partial<Board>) {
    const id = this.firestore.createId();
    const lists = this.initNewBoardLists();
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
        this.update({ currentBoard: board });
        const boards = this.boardsCache.get(board.workspaceID);
        if (!!boards) {
          boards.push(board);
          this.boardsCache.set(board.workspaceID, boards);
        }
        this.cacheService.setItem(CacheKeys.CurrentBoard, board);
      });
  }
  private initNewBoardLists(): List[] {
    const lists: List[] = [
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
    lists.forEach(list => {
      this.firestore.doc(`list/${list.id}`).set(list);
    });
    return lists;
  }
}
