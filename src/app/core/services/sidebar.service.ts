import { Injectable } from '@angular/core';
import { Icons, MenuItem } from '@ui-components';
import { map, Observable } from 'rxjs';
import { WorkspacesQuery } from 'src/app/state/workspaces/workspace.query';
import { WorkspaceStore } from 'src/app/state/workspaces/workspaces.store';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  Icons = Icons;
  constructor(
    private workspaceQuery: WorkspacesQuery,
    private workspaceStore: WorkspaceStore,
  ) { }
  getMenuLinks(): Observable<MenuItem[]> {
    return this.workspaceQuery.currentWorkspace$.pipe(
      map(workspace => {
        if (!!workspace) return this.getWorkspaceLinks();
        else return this.getDashboardLinks();
      })
    );
  }

  getWorkspaceLinks() {
    return [
      {
        label: 'Boards',
        route: '/workspace',
        icon: Icons.ClipBoard,
      },
      {
        label: 'Members',
        route: '/workspace/members',
        icon: Icons.User
      },
      {
        label: 'Settings',
        route: '/workspace/settings',
        icon: Icons.Settings
      }
    ];
  }
  getDashboardLinks() {
    return [
      {
        label: 'Boards',
        route: '/dashboard/boards',
        icon: Icons.ClipBoard,
        command: () => {
          this.workspaceStore.setCurrentWorkspace(null);
        }
      },
      {
        label: 'Templates',
        route: '/dashboard/templates',
        icon: Icons.BorderAll
      },
      {
        label: 'Home',
        route: '/dashboard/home',
        icon: Icons.Home
      }
    ];
  }
}
