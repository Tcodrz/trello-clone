import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { StoreService } from './../../state/state.service';
import { UserState } from './../../state/user/user.reducer';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanLoad {
  constructor(
    private store: StoreService,
    private router: Router,
  ) { }
  canLoad(): Observable<boolean | UrlTree> {
    return this.store.select('userState').pipe(
      map(userState => {
        const user = (userState as UserState).user;
        if (user) return true;
        // https://juristr.com/blog/2018/11/better-route-guard-redirects/
        else return this.router.createUrlTree(['home']);
      })
    );
  }

}
