import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { StateService } from './../../state/state.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanLoad, CanActivate {
  constructor(
    private state: StateService,
    private router: Router,
  ) { }
  canActivate(): Observable<boolean | UrlTree> {
    return this.isLoggedIn();
  }
  canLoad(): Observable<boolean | UrlTree> {
    return this.isLoggedIn();
  }
  private isLoggedIn() {
    return this.state.getUser().pipe(
      map(user => !!user ? this.router.createUrlTree(['/dashboard/boards']) : true)
    );
  }

}
