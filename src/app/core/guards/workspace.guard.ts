import { WorkspacesQuery } from 'src/app/state/workspaces/workspace.query';
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CacheKeys, CacheService } from './../services/cache.service';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceGuard implements CanActivate {
  constructor(
    private cache: CacheService,
    private router: Router,
    private workspacesQuery: WorkspacesQuery
  ) { }
  canActivate(): Observable<boolean | UrlTree> {
    return this.workspacesQuery.currentWorkspace$.pipe(
      map(workspace => {
        const cahceWorkspace = this.cache.getItem(CacheKeys.CurrentWorkspace);
        const hasWorkspace = !!workspace || !!cahceWorkspace;
        return hasWorkspace ? true : this.router.createUrlTree(['dashboard/boards']);
      })
    );
  }

}
