import { StateService } from './../../state/state.service';
import { map, switchMap, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Board } from '../interface/board.interface';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  constructor(
    private firestore: AngularFirestore,
    private state: StateService,
  ) { }
  getBoards(workspaceID: string): Observable<Board[]> {
    const collection = this.firestore.collection<Board>('board');
    return collection.get().pipe(
      map(ref => ref.docs.map(x => ({ ...x.data() as Board, id: x.id }))),
      map(boards => boards.filter(x => x.workspaceID === workspaceID)),
      map(boards => this.state.setBoards(boards)),
      switchMap(() => this.state.getBoards())
    );
  }
}
