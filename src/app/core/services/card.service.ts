import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, tap } from 'rxjs';
import { Checklist, ChecklistItem } from '../interface/checklist.interface';
import { List } from '../interface/list.interface';
import { ListsStore } from './../../state/lists/lists.store';
import { Card } from './../interface/card.interface';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private card: Card | null = null;
  constructor(
    private firestore: AngularFirestore,
    private listStore: ListsStore

  ) { }
  getCard(cardID: string): Observable<Card | null> {
    return this.firestore.doc<Card>(`card/${cardID}`).valueChanges()
      .pipe(
        map(card => card ?? null),
        tap(card => this.card = card)
      );
  }
  getCards(listID: string): Observable<Card[]> {
    return this.firestore.collection<Card>('card').get().pipe(
      map(cards => cards.docs.filter(c => c.data().listID === listID)),
      map(cards => cards.map(c => ({ ...c.data(), id: c.id })))
    );
  }
  saveCard() {
    this.listStore.update(state => {
      if (!this.card) {
        debugger;
        return state;
      }
      const lists = state.lists;
      const index = lists.findIndex(list => list.id === this.card?.listID);
      if (index === -1) return state;
      const list = lists[index];
      const cardIndex = list.cards.findIndex(c => c.id === this.card?.id);
      list.cards[cardIndex] = this.card;

      this.firestore.doc<List>(`list/${list.id}`).set(list);

      return {
        ...state,
        lists: lists.map(x => list.id === x.id ? list : x)
      };
    });
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
  updateChecklist(list: Checklist) {
    if (!this.card) return;
    this.card.checklists = this.card.checklists.map(x => x.id === list.id ? list : x);
    this.updateDB(this.card);
  }
  updateDB(card: Card) {
    this.firestore.collection<Card>('card').doc(card.id).set(card);
  }
}
