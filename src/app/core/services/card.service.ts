import { Board } from 'src/app/core/interface/board.interface';
import { map, Observable } from 'rxjs';
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
  getCardsByListID(listID: string, board: Board): Observable<Card[]> {
    const collection = this.firestore.collection<Card>('card').get();
    const filtered = collection.pipe(map(cards => cards.docs.filter(c => listID === c.data().listID)));
    return filtered.pipe(map(cards => cards.map(card => ({ ...card.data(), id: card.id }))));
  }
  getCardsByBoard(board: Board): Observable<Card[]> {
    const collection = this.firestore.collection<Card>('card').get();
    return collection.pipe(
      map(cards => cards.docs.filter(card => board.listIDs.includes(card.data().listID))),
      map(cards => cards.map(c => ({ ...c.data(), id: c.id }))),
      map(cards => cards.sort((a, b) => a.position - b.position))
    );
  }
}
