import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store, StoreConfig } from '@datorama/akita';
import { map, mergeMap, tap } from 'rxjs';
import { Board } from 'src/app/core/interface/board.interface';
import { List } from 'src/app/core/interface/list.interface';
import { Card } from './../../core/interface/card.interface';
import { CacheKeys, CacheService } from './../../core/services/cache.service';

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
        tap(boards => this.boardsCache.set(workspaceID, boards)),
      ))
    ).subscribe(boards => this.update({ boards }))
  }
  create(newBoard: Partial<Board>) {
    const id = this.firestore.createId();
    const lists = this.initNewBoardLists();
    const listIDs: string[] = lists.map(x => x.id);
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
  }
  addCardToList(card: Card) {
    const addToList = (board: Board, c: Card): List[] => {
      if (!board.lists) return [];
      return board.lists.map(list => list.id === c.listID ? { ...list, cards: list.cards.concat(c) } : list)
    }

    this.update(state => {
      if (!state.currentBoard) {
        debugger; // should not occur
        return state;
      }
      return {
        ...state,
        currentBoard: {
          ...state.currentBoard,
          lists: addToList(state.currentBoard, card)
        }
      }
    });
    this.updateBoard(this.getValue().currentBoard as Board);

  }
  updateBoard(board: Board) {
    this.update(state => {
      const boards = this.boardsCache.get(board.workspaceID);
      if (boards) this.boardsCache.set(board.workspaceID, boards?.map(b => b.id === board.id ? board : b));
      return {
        ...state,
        boards: state.boards.map(x => x.id === board.id ? board : x),
      }
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
