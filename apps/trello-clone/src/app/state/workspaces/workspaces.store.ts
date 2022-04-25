import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store, StoreConfig } from '@datorama/akita';
import { map, Subscription } from 'rxjs';
import { Workspace } from '../../core/interface/workspace.interface';
import { BoardsStore } from '../boards/boards.store';
import { CacheKeys, CacheService } from './../../core/services/cache.service';

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
  private collection = this.firestore.collection<Workspace>('workspace');
  private subscription!: Subscription;
  constructor(
    private boardsStore: BoardsStore,
    private cacheService: CacheService,
    private firestore: AngularFirestore,
  ) {
    super(createInitialState());
  }
  init(userID: string): void {
    if (this.subscription) return; // prevent multiple subscriptions
    this.subscription = this.collection.valueChanges().pipe(
      map(workspaces => workspaces.filter(workspace => workspace.userID === userID)),
    ).subscribe(workspaces => this.update({ workspaces }));
  }
  setCurrentWorkspaceByID(workspaceID: string) {
    const state = this.getValue();
    const index = state.workspaces.findIndex(workspace => workspace.id === workspaceID);
    if (index !== -1) this.setCurrentWorkspace(state.workspaces[index]);
  }
  setCurrentWorkspace(workspace: Workspace | null) {
    if (workspace) this.boardsStore.init(workspace.id);
    this.update({ currentWorkspace: workspace });
    this.cacheService.setItem(CacheKeys.CurrentWorkspace, workspace);
  }
  create(workspace: Partial<Workspace>) {
    const id = this.firestore.createId();
    const newWorkspace = { ...workspace, id } as Workspace;
    this.collection.doc(id).set(newWorkspace);
  }
}
