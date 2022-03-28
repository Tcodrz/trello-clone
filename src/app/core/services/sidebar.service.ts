import { MenuItem } from './../../ui-components/menu/menu/menu.component';
import { map, Observable } from 'rxjs';
import { StateService } from './../../state/state.service';
import { Injectable } from '@angular/core';
import { Icons } from 'src/app/ui-components/button/icon/icons';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  Icons = Icons;
  constructor(
    private state: StateService,
  ) { }
  getMenuLinks(): Observable<MenuItem[]> {
    return this.state.getCurrentWorkspace().pipe(
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
          this.state.workspaceSetCurrent(null);
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
