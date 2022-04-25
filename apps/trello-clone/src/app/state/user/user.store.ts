import { CacheKeys, CacheService } from './../../core/services/cache.service';
import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { User } from './../../core/interface/user.interface';

export interface UserState {
  user: User | null;
}

function getInitialState(): UserState {
  return {
    user: null,
  }
}
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user' })
export class UserStore extends Store<UserState> {
  constructor(
    private cacheService: CacheService,
  ) {
    super(getInitialState());
  }
  login(user: User) {
    this.update({ user });
    this.cacheService.setItem(CacheKeys.User, user);
  }
  logout() {
    this.update({ user: null });
    this.cacheService.deleteItem(CacheKeys.User);
  }
}
