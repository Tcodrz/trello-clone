import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store, StoreConfig } from '@datorama/akita';
import { map, mergeMap } from 'rxjs';
import { Board } from '../../core/interface/board.interface';
import { List } from '../../core/interface/list.interface';
import { UserStore } from './../user/user.store';
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
    private userStore: UserStore,
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
      mergeMap(boards => listCollection.get().pipe(
        map(lists => {
          const listIDs = boards.map(b => b.listIDs).flat();
          const boardsLists = lists.docs
            .filter(list => listIDs.includes(list.id))
            .map(list => ({ ...list.data() as List, id: list.id }))
          return boardsLists;
        }),
        map(lists => boards.map(board => ({
          ...board, lists: lists
            .filter(list => board.listIDs.includes(list.id))
            .sort((a, b) => a.position - b.position)
        }))),
      ))
    ).subscribe(boards => this.update({ boards }))
  }
  async create(newBoard: Partial<Board>): Promise<Board> {
    const id = this.firestore.createId();
    const lists = await this.initNewBoardLists();
    const listIDs: string[] = lists.map(x => x.id);
    const userState = this.userStore.getValue();
    const board: Board = {
      ...newBoard,
      id,
      listIDs: listIDs,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      members: [userState.user],
    } as Board;
    this.firestore.doc<Board>(`board/${id}`).set(board);
    board.lists = lists;
    this.update({ currentBoard: board });
    return board;
  }
  private async initNewBoardLists(): Promise<List[]> {
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
    await Promise.all(lists.map(list => this.firestore.doc(`list/${list.id}`).set(list)));
    return lists;
  }
}
