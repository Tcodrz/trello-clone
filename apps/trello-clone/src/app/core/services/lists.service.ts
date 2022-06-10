import {CardService} from './card.service';
import {Injectable} from '@angular/core';
import {List} from '@trello-clone/trello-interface';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  constructor(
    private cardService: CardService
  ) { }
  populateCards(list: List): Observable<List> {
    return this.cardService.getCards(list.id).pipe(
      map(cards => cards.sort((a,b) => a.position - b.position)),
      map(cards => ({ ...list, cards }))
    );
  }
}
