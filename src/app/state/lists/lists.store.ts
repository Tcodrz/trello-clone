import { Card } from './../../core/interface/card.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { List } from './../../core/interface/list.interface';
import { map } from 'rxjs';
import { Board } from 'src/app/core/interface/board.interface';


export interface ListsState {
  lists: List[];
}

export function createInitialState(): ListsState {
  return {
    lists: [],
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'lists' })
export class ListsStore extends Store<ListsState> {
  constructor(
    private firestore: AngularFirestore,
  ) {
    super(createInitialState());
  }
  setLists(board: Board) {
    this.firestore.collection<List>('list').get().pipe(
      map(lists => lists.docs.filter(list => board.listIDs.includes(list.id))),
      map(lists => lists.map(list => ({ ...list.data(), id: list.id })))
    ).subscribe(lists => this.update({ lists }));
  }
  createCard(c: Partial<Card>): void {
    const card: Card = {
      ...c,
      id: this.firestore.createId(),
    } as Card;
    this.firestore.doc(`card/${card.id}`).set(card);
    this.update(state => {
      const lists = state.lists.map(list => {
        if (list.id === card.listID) {
          const newList = {
            ...list,
            cards: [...list.cards, card]
          };
          this.firestore.doc(`list/${list.id}`).set(newList);
          return newList;
        }
        else return list;
      })
      return { lists };
    });
  }
}
