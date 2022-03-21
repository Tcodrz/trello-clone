import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserState } from 'src/app/state/user/user.reducer';
import { isDev } from '../utils/utils';
import { StoreService } from './../../state/state.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanLoad {
  constructor(
    private store: StoreService,
    private router: Router,
  ) { }
  canLoad(): Observable<boolean | UrlTree> | boolean {
    if (isDev()) return true;
    return this.store.select('userState').pipe(
      map(state => {
        const isLoggedIn = !!(state as UserState).user;
        return !isLoggedIn || this.router.createUrlTree(['/dashboard/boards']);
      })
    )
  }

}
