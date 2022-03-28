import { StateService } from './../../state/state.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceGuard implements CanActivate {
  constructor(
    private state: StateService,
    private router: Router,
  ) { }
  canActivate(): Observable<boolean | UrlTree> {
    return this.state.getCurrentWorkspace().pipe(
      map(workspace => !!workspace ? true : this.router.createUrlTree(['dashboard/boards']))
    );
  }

}
