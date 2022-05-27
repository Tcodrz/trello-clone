import {Injectable} from "@angular/core";
import {Query} from "@datorama/akita";
import {Observable} from 'rxjs';
import {Card} from '@trello-clone/trello-interface';
import {CardState, CardStore} from "./card.store";

@Injectable({ providedIn: 'root' })
export class CardQuery extends Query<CardState>{
  card$: Observable<Card | null> = this.select('card');
  constructor(protected override store: CardStore) {
    super(store);
  }
}
