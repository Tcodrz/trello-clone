import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Checklist, ChecklistItem } from '../interface/checklist.interface';
import { CardQuery } from './../../state/card/card.query';
import { CardStore } from './../../state/card/card.store';
import { Card } from './../interface/card.interface';
import { BoardsService } from './boards.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(
    private cardQuery: CardQuery,
    private cardStore: CardStore,
    private firestore: AngularFirestore,
    private boardService: BoardsService,

  ) { }
  getCurrentCard(): Observable<Card | null> {
    return this.cardQuery.card$;
  }
  setCurrentCard(card: Card | null): void {
    this.cardStore.update({ card });
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
  addChecklistItem(item: ChecklistItem) {
    const card = this.cardStore.getValue().card;
    if (!card) return;
    const index = card.checklists.findIndex(list => list.id === item.checklistID);
    if (index < 0) return;
    const checklist = card.checklists[index];
    checklist.items = [...checklist.items, item];

    this.cardStore.update({
      card: {
        ...card,
        checklists: card.checklists.map(list => list.id === item.checklistID ? checklist : list)
      }
    })
  }
  checklistDelete(checklist: Checklist): void {
    const collection = this.firestore.collection<Card>('card');
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
      collection.doc(card.id).set(card);
      return { card };
    });
  }
}
