import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { WorkspaceStore } from 'src/app/state/workspaces/workspaces.store';
import { Workspace } from './../../core/interface/workspace.interface';
import { WorkspacesState } from './workspaces.store';


@Injectable({ providedIn: 'root' })
export class WorkspacesQuery extends Query<WorkspacesState> {
  workspaces$: Observable<Workspace[]> = this.select('workspaces');
  currentWorkspace$: Observable<Workspace | null> = this.select('currentWorkspace');
  constructor(protected override store: WorkspaceStore) {
    super(store);
  }
}
