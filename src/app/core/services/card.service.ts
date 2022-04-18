import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, tap } from 'rxjs';
import { Checklist, ChecklistItem } from '../interface/checklist.interface';
import { CardStore } from './../../state/card/card.store';
import { Card } from './../interface/card.interface';
import { BoardsService } from './boards.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(
    private cardStore: CardStore,
    private firestore: AngularFirestore,
    private boardService: BoardsService,

  ) { }
  getCard(cardID: string): Observable<Card> {
    return this.firestore.doc<Card>(`card/${cardID}`).get()
      .pipe(map(card => ({ ...card.data() as Card, id: card.id })),
        tap(card => console.log(card)));
  }
  addChecklist(checkListName: string): void {
    const card = this.cardStore.getValue().card;
    const collection = this.firestore.collection<Card>('card');
    const checklist: Checklist = {
      id: this.firestore.createId(),
      name: checkListName,
      items: [],
    };
    if (card) {
      card.checklists = !card.checklists ? [checklist] : [...card.checklists, checklist];
      collection.doc(card.id).set(card).then(() => this.cardStore.update({ card }));
    }

  }
  addChecklistItem(item: Partial<ChecklistItem>) {
    item.id = this.firestore.createId();
    const card = this.cardStore.getValue().card;
    if (!card) return;
    const index = card.checklists.findIndex(list => list.id === item.checklistID);
    if (index < 0) return;
    const checklist = card.checklists[index];
    checklist.items = [...checklist.items, item as ChecklistItem];
    const newCard = {
      ...card,
      checklists: card.checklists.map(list => list.id === item.checklistID ? checklist : list)
    };
    this.cardStore.update({ card: newCard });
    this.updateDB(newCard);
  }
  checklistDelete(checklist: Checklist): void {
    this.cardStore.update(state => {
      if (!state.card) return state;
      const checklists = state.card.checklists.filter(list => list.id !== checklist.id);
      const card: Card = { ...state.card, checklists };
      const board = this.boardService.getCurrentBoardValue();
      if (board && board.lists) this.boardService.setCurrentBoard({
        ...board,
        lists: board.lists.map(list => list.id === card.listID ?
          ({ ...list, cards: list.cards.map(c => card.id === c.id ? card : c) }) : list)
      });
      this.updateDB(card);
      return { card };
    });
  }
  updateChecklistItem(item: ChecklistItem) {
    const card = this.cardStore.getValue().card;
    if (!card) return;
    const newCard: Card = {
      ...card,
      checklists: card.checklists
        .map(list => list.id === item.checklistID ?
          { ...list, items: list.items.map(i => i.id === item.id ? item : i) } : list)
    }
    this.updateDB(newCard);
    this.cardStore.update({ card: newCard });
  }

  updateDB(card: Card) {
    this.firestore.collection<Card>('card').doc(card.id).set(card);
  }
}
