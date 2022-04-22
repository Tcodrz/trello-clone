import { CardService } from './card.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { List } from '../interface/list.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  constructor(
    private cardService: CardService
  ) { }
  populateCards(list: List): Observable<List> {
    return this.cardService.getCards(list.id).pipe(
      map(cards => ({ ...list, cards }))
    );
  }
}
