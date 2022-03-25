import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { StateService } from './../../state/state.service';
import { UserState } from './../../state/user/user.reducer';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanLoad, CanActivateChild, CanActivate {
  constructor(
    private state: StateService,
    private router: Router,
  ) { }
  canActivate(): Observable<boolean | UrlTree> {
    return this.hasUser();
  }
  canActivateChild(): Observable<boolean | UrlTree> {
    return this.hasUser();
  }
  canLoad(): Observable<boolean | UrlTree> {
    return this.hasUser();
  }
  private hasUser(): Observable<boolean | UrlTree> {
    return this.state.getUser().pipe(
      map(user => {
        // https://juristr.com/blog/2018/11/better-route-guard-redirects/
        return !!user ?? this.router.createUrlTree(['']);
      })
    );
  };
}
