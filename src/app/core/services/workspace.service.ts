import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, switchMap } from 'rxjs';
import { Board } from '../interface/board.interface';
import { Workspace } from '../interface/workspace.interface';
import { Action, StateService } from './../../state/state.service';
import { MenuItem, MenuItems } from './../../ui-components/menu/menu/menu.component';
import { CacheKeys, CacheService } from './cache.service';
import { GotoService } from './goto.service';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  private _workspaces: Workspace[] = [];
  constructor(
    private cache: CacheService,
    private firestore: AngularFirestore,
    private goto: GotoService,
    private logger: LogService,
    private state: StateService,
  ) { }
  init() {
    const currentWorkspace = this.cache.getItem<Workspace>(CacheKeys.CurrentWorkspace);
    if (!!currentWorkspace) this.state.workspaceSetCurrent(currentWorkspace);
  }
  loadAll(): Observable<Workspace[]> {
    this.logger.logAction({ action: Action.WorkspaceGet, value: this });
    const collection = this.firestore.collection<Workspace>('workspace');
    return this.state.getUser().pipe(
      switchMap(user => {
        return collection.valueChanges().pipe(
          map(workspaces => workspaces.filter(x => x.userID === user?.id)),
          map(workspaces => {
            this._workspaces = workspaces;
            this.state.setWorkspaces(workspaces)
          }),
          switchMap(() => this.state.getWorkspaces())
        );
      })
    );
  }
  getCurrentWorkspace(): Observable<Workspace | null> {
    this.logger.logAction({ action: Action.WorkspaceLoad, value: this });
    return this.state.getCurrentWorkspace();
  }
  setCurrentWorkspaceByID(workspaceID: string) {
    const workspace = this._workspaces.find(x => x.id === workspaceID);
    if (!!workspace) this.setCurrentWorkspace(workspace);
  }
  setCurrentWorkspace(workspace: Workspace | null) {
    this.state.workspaceSetCurrent(workspace);
  }
  create(workspace: Partial<Workspace>): Observable<Workspace> {
    const collection = this.firestore.collection('workspace');
    return new Observable((observer) => {
      collection.add(workspace).then(ref => {
        ref.get().then(snap => {
          const id = snap.id;
          const newWorkspace = snap.data() as Workspace;
          newWorkspace.id = id;
          this.firestore.doc(`workspace/${id}`).set(newWorkspace)
            .then(() => observer.next(newWorkspace));
        });
      });
    });
  }
  getWorkspaceByID(workspaceID: string): Observable<Workspace> {
    this.logger.logAction({ action: Action.WorkspaceGetByID, value: this });
    return this.firestore.doc(`workspaces/${workspaceID}`).get().pipe(
      map(ref => ref.data() as Workspace)
    );
  }
  getMenuItems(): Observable<MenuItems[]> {
    return this.loadAll().pipe(
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
        this.state.workspaceSetCurrent(workspace);
        this.goto.workspace()
      }
    }));
    return items;
  }
}
