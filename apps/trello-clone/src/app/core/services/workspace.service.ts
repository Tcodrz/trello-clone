import {MenuItem, MenuItems} from '@ui-components';
import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {WorkspacesQuery} from '../../state/workspaces/workspace.query';
import {WorkspaceStore} from '../../state/workspaces/workspaces.store';
import {Workspace} from '@trello-clone/trello-interface';
import {CacheService} from './cache.service';
import {GotoService} from './goto.service';

@Injectable({providedIn: 'root'})
export class WorkspaceService {
  constructor(
    private cache: CacheService,
    private goto: GotoService,
    private workspaceQuery: WorkspacesQuery,
    private workspaceStore: WorkspaceStore,
  ) {
  }

  getAll(): Observable<Workspace[]> {
    return this.workspaceQuery.workspaces$;
  }

  getCurrentWorkspace(): Observable<Workspace | null> {
    return this.workspaceQuery.currentWorkspace$;
  }

  getWorkspace(workspaceID: string): Observable<Workspace | null> {
    return this.workspaceQuery.workspaces$.pipe(
      map(workspaces => workspaces.find(workspace => workspace.id === workspaceID)),
      map(workspace => {
        return workspace ?? null
      })
    );
  }

  setCurrentWorkspaceByID(workspaceID: string) {
    this.workspaceStore.setCurrentWorkspaceByID(workspaceID);
  }

  setCurrentWorkspace(workspace: Workspace | null) {
    this.workspaceStore.setCurrentWorkspace(workspace);
  }

  getMenuItems(): Observable<MenuItems[]> {
    return this.workspaceQuery.workspaces$.pipe(
      map(workspaces => {
        const menuItems: MenuItems = {
          headline: '',
          items: this.prepareMenuItems(workspaces)
        };
        return [menuItems];
      })
    );
  }

  private prepareMenuItems(workspaces: Workspace[]) {
    const items: MenuItem[] = workspaces.map(workspace => ({
      label: workspace.name,
      id: workspace.id,
      command: () => {
        this.workspaceStore.setCurrentWorkspace(workspace);
        this.goto.workspace(workspace.id);
      }
    }));
    return items;
  }
}
