import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { StateService } from './../../state/state.service';
import { CacheKeys, CacheService } from './../services/cache.service';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceGuard implements CanActivate {
  constructor(
    private state: StateService,
    private router: Router,
    private cache: CacheService,
  ) { }
  canActivate(): Observable<boolean | UrlTree> {
    return this.state.getCurrentWorkspace().pipe(
      map(workspace => {
        const cahceWorkspace = this.cache.getItem(CacheKeys.CurrentWorkspace);
        const hasWorkspace = !!workspace || !!cahceWorkspace;
        return hasWorkspace ? true : this.router.createUrlTree(['dashboard/boards']);
      })
    );
  }

}
