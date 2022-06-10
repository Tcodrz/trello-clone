import { User } from '@trello-clone/trello-interface';
import { Observable } from 'rxjs';
import { Query } from '@datorama/akita';
import { UserState, UserStore } from './user.store';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class UserQuery extends Query<UserState> {
  user$: Observable<User | null> = this.select('user');
  constructor(protected override store: UserStore) {
    super(store);
  }
}
