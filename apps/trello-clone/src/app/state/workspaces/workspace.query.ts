import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { Workspace } from '@trello-clone/trello-interface';
import { WorkspacesState, WorkspaceStore } from './workspaces.store';


@Injectable({ providedIn: 'root' })
export class WorkspacesQuery extends Query<WorkspacesState> {
  workspaces$: Observable<Workspace[]> = this.select('workspaces');
  currentWorkspace$: Observable<Workspace | null> = this.select('currentWorkspace');
  constructor(protected override store: WorkspaceStore) {
    super(store);
  }
}
