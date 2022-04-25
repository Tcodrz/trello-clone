import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { ListsState, ListsStore } from "./lists.store";
import { List } from 'src/app/core/interface/list.interface';

@Injectable({ providedIn: 'root' })
export class ListsQuery extends Query<ListsState> {
  lists$: Observable<List[]> = this.select('lists');
  constructor(protected override store: ListsStore) {
    super(store);
  }
}
