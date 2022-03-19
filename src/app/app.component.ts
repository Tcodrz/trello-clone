import { Component } from '@angular/core';
import { CacheKeys, CacheService } from './core/services/cache.service';
import { StoreService } from './state/state.service';
import { Login } from './state/user/user.actions';
import { User } from './state/user/user.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private cacheService: CacheService,
    private store: StoreService,
  ) { }
  ngOnInit() {
    const user = this.cacheService.getItem<User>(CacheKeys.User);
    if (!!user) {
      this.store.dispatch(Login(user));
    }
  }
}
