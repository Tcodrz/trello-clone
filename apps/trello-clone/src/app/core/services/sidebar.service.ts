import { Icons } from './../../../../../../libs/ui-components/src/lib/button/icon/icons';
import { MenuItem } from './../../../../../../libs/ui-components/src/interface/menu.interface';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { WorkspacesQuery } from '../../state/workspaces/workspace.query';
import { WorkspaceStore } from '../../state/workspaces/workspaces.store';
import { Workspace } from "@trello-clone/trello-interface";

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
        if (workspace) return this.getWorkspaceLinks(workspace);
        else return this.getDashboardLinks();
      })
    );
  }

  getWorkspaceLinks(workspace: Workspace) {
    return [
      {
        label: 'Boards',
        route: `/workspace`,
        icon: Icons.ClipBoard,
        routeParams: {
          workspaceID: workspace.id
        }
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
