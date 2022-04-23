import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, tap } from 'rxjs';
import { Checklist, ChecklistItem } from '../interface/checklist.interface';
import { List } from '../interface/list.interface';
import { BoardsStore } from './../../state/boards/boards.store';
import { ListsStore } from './../../state/lists/lists.store';
import { Card } from './../interface/card.interface';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private card: Card | null = null;
  constructor(
    private firestore: AngularFirestore,
    private listStore: ListsStore,
    private boardStore: BoardsStore,
  ) { }
  createCardFromItem(item: ChecklistItem) {
    if (!this.card) return;
    const list = this.listStore.getValue().lists.find(list => list.id === this.card?.listID);
    if (!list) return;
    this.deleteChecklistItem(item);
    const card: Card = {
      id: this.firestore.createId(),
      createdAt: new Date().getTime(),
      listID: this.card.listID,
      name: item.title,
      checklists: [],
      position: list.cards.length + 1,
    };
    list.cards.push(card);
    this.boardStore.update(state => {
      const board = state.boards.find(b => b.listIDs.includes(list.id));
      if (!board) return state;
      board.lists = board.lists?.map(l => l.id === list.id ? list : l);
      return {
        boards: state.boards.map(x => x.id === board.id ? board : x)
      };
    });
    this.firestore.doc(`list/${list.id}`).set(list);
    this.firestore.doc(`card/${card.id}`).set(card);
  }
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
  checklistAdd(checkListName: string): void {
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
  checklistDelete(checklist: Checklist): void {
    if (!this.card) return;
    const checklists = this.card.checklists.filter(list => list.id !== checklist.id);
    const card = {
      ...this.card,
      checklists
    }
    this.updateDB(card);
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
  deleteChecklistItem(item: ChecklistItem): void {
    if (!this.card) return;
    const checklist = this.card.checklists.find(c => c.id === item.checklistID);
    if (!checklist) return;
    checklist.items = checklist?.items.filter(i => i.id !== item.id);
    const newCard: Card = {
      ...this.card,
      checklists: this.card.checklists
        .map(c => c.id === checklist.id ? checklist : c)
    };
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
