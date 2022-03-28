import { StateService } from './../../state/state.service';
import { Card } from './../interface/card.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(
    private firestore: AngularFirestore,
    private state: StateService,
  ) { }
  createCard(c: Partial<Card>) {
    const card: Card = {
      id: this.firestore.createId(),
      ...c
    } as Card;
    this.firestore.doc(`card/${card.id}`).set(card).then(() => {
      this.state.addCardToList(card);
    });
  }
}
