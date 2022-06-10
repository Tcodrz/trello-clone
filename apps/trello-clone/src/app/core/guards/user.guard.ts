import { UserQuery } from '../../state/user/user.query';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanLoad, CanActivateChild, CanActivate {
  constructor(
    private userQuery: UserQuery,
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
    return this.userQuery.user$.pipe(
      map(user => {
        // https://juristr.com/blog/2018/11/better-route-guard-redirects/
        return !!user ?? this.router.createUrlTree(['']);
      })
    );
  };
}
