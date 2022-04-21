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
  private card: Card | null = null;
  constructor(
    private cardStore: CardStore,
    private firestore: AngularFirestore,
    private boardService: BoardsService,

  ) { }
  getCard(cardID: string): Observable<Card | null> {
    return this.firestore.doc<Card>(`card/${cardID}`).valueChanges()
      .pipe(
        tap(console.log),
        map(card => card ?? null),
        tap(card => this.card = card)
      );
  }
  addChecklist(checkListName: string): void {
    const card = this.card;
    const collection = this.firestore.collection<Card>('card');
    const checklist: Checklist = {
      id: this.firestore.createId(),
      name: checkListName,
      items: [],
    };
    if (card) {
      card.checklists = !card.checklists ? [checklist] : [...card.checklists, checklist];
      collection.doc(card.id).set(card);
    }

  }
  addChecklistItem(item: Partial<ChecklistItem>) {
    item.id = this.firestore.createId();
    const card = this.card;
    if (!card) return;
    const index = card.checklists.findIndex(list => list.id === item.checklistID);
    if (index < 0) return;
    const checklist = card.checklists[index];
    checklist.items = [...checklist.items, item as ChecklistItem];
    const newCard = {
      ...card,
      checklists: card.checklists.map(list => list.id === item.checklistID ? checklist : list)
    };
    this.updateDB(newCard);
  }
  checklistDelete(checklist: Checklist): void {
    if (!this.card) return;
    const checklists = this.card.checklists.filter(list => list.id !== checklist.id);
    const card = {
      ...this.card,
      checklists
    }
    this.updateDB(card);
  }
  updateChecklistItem(item: ChecklistItem) {
    const card = this.card;
    if (!card) return;
    const newCard: Card = {
      ...card,
      checklists: card.checklists
        .map(list => list.id === item.checklistID ?
          { ...list, items: list.items.map(i => i.id === item.id ? item : i) } : list)
    }
    this.updateDB(newCard);
  }

  updateDB(card: Card) {
    this.firestore.collection<Card>('card').doc(card.id).set(card);
  }
}
