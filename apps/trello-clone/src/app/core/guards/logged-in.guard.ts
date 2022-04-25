import { UserQuery } from './../../state/user/user.query';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanLoad, CanActivate {
  constructor(
    private userQuery: UserQuery,
    private router: Router,
  ) { }
  canActivate(): Observable<boolean | UrlTree> {
    return this.isLoggedIn();
  }
  canLoad(): Observable<boolean | UrlTree> {
    return this.isLoggedIn();
  }
  private isLoggedIn() {
    return this.userQuery.user$.pipe(
      map(user => !!user ? this.router.createUrlTree(['/dashboard/boards']) : true)
    );
  }

}
