import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, switchMap } from 'rxjs';
import { Workspace } from '../interface/workspace.interface';
import { StateService } from './../../state/state.service';
import { MenuItem, MenuItems } from './../../ui-components/menu/menu/menu.component';
import { GotoService } from './goto.service';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  constructor(
    private firestore: AngularFirestore,
    private state: StateService,
    private goto: GotoService,
  ) { }
  loadAll(userID: string): Observable<Workspace[]> {
    const collection = this.firestore.collection('workspace');
    return collection.get().pipe(
      map(ref => ref.docs.map(x => ({ ...x.data() as Workspace, id: x.id }))),
      map(workspaces => workspaces.filter(x => x.userID === userID)),
      map(workspaces => this.state.setWorkspaces(workspaces)),
      switchMap(() => this.state.getWorkspaces())
    );
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
    return this.firestore.doc(`workspaces/${workspaceID}`).get().pipe(
      map(ref => ref.data() as Workspace)
    );
  }
  getMenuItems(userID: string): Observable<MenuItems[]> {
    return this.loadAll(userID).pipe(
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
        this.state.loadWorkspace(workspace);
        this.goto.workspace()
      }
    }));
    return items;
  }
}
