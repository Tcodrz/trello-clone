import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Workspace } from 'src/app/core/interface/workspace.interface';
import { map } from 'rxjs';

export interface WorkspacesState {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
}

export function createInitialState(): WorkspacesState {
  return {
    workspaces: [],
    currentWorkspace: null,
  };
}
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'workspace' })
export class WorkspaceStore extends Store<WorkspacesState> {
  collection = this.firestore.collection<Workspace>('workspace');
  constructor(
    private firestore: AngularFirestore,
  ) {
    super(createInitialState());
  }
  init(userID: string): void {
    this.collection.valueChanges().pipe(
      map(workspaces => workspaces.filter(workspace => workspace.userID === userID)),
    ).subscribe(workspaces => this.update({ workspaces }));
  }
  setCurrentWorkspaceByID(workspaceID: string) {
    const state = this.getValue();
    const index = state.workspaces.findIndex(workspace => workspace.id === workspaceID);
    if (index !== -1) this.setCurrentWorkspace(state.workspaces[index]);
  }
  setCurrentWorkspace(workspace: Workspace | null) {
    this.update({ currentWorkspace: workspace });
  }
  create(workspace: Partial<Workspace>) {
    const id = this.firestore.createId();
    const newWorkspace = { ...workspace, id } as Workspace;
    this.collection.doc(id).set(newWorkspace).then(() => { })
  }
}
