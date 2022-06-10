import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import {Card} from "@trello-clone/trello-interface";

export interface CardState {
  card: Card | null;
}

function initialState(): CardState {
  return {
    card: null,
  }
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'card' })
export class CardStore extends Store<CardState> {
  constructor() {
    super(initialState());
  }
}
