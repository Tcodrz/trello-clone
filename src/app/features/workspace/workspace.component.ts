import { BoardsService } from './../../core/services/boards.service';
import { Component, OnInit } from '@angular/core';
import { map, Observable, of, tap, switchMap } from 'rxjs';
import { Workspace } from 'src/app/core/interface/workspace.interface';
import { StateService } from './../../state/state.service';
import { Board } from 'src/app/core/interface/board.interface';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  workspace$: Observable<Workspace | null> = of(null);
  boards$: Observable<Board[]> = of([]);
  constructor(
    private state: StateService,
    private boards: BoardsService,
  ) { }

  ngOnInit(): void {
    this.workspace$ = this.state.getCurrentWorkspace();
    this.boards$ = this.workspace$.pipe(
      switchMap(workspace => {
        const workspaceID = workspace?.id ?? '';
        return this.boards.getBoards(workspaceID)
      })
    );

  }

}
