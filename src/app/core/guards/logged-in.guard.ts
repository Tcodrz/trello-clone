import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserState } from 'src/app/state/user/user.reducer';
import { StoreService } from './../../state/state.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanLoad, CanActivate {
  constructor(
    private store: StoreService,
    private router: Router,
  ) { }
  canActivate(): Observable<boolean | UrlTree> {
    return this.isLoggedIn();
  }
  canLoad(): Observable<boolean | UrlTree> {
    // if (isDev()) return true;
    return this.isLoggedIn();
  }
  private isLoggedIn() {
    return this.store.select('userState').pipe(
      map(state => {
        const isLoggedIn = !!(state as UserState).user;
        if (isLoggedIn) return this.router.createUrlTree(['/dashboard/boards']);
        else return true;
      })
    );
  }

}
