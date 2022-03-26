import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Board } from 'src/app/core/interface/board.interface';
import { Workspace } from 'src/app/core/interface/workspace.interface';
import { BoardsService } from './../../core/services/boards.service';
import { WorkspaceService } from './../../core/services/workspace.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  workspace$: Observable<Workspace | null> = of(null);
  boards$: Observable<Board[]> = of([]);
  constructor(
    private boardsService: BoardsService,
    private workspaceService: WorkspaceService,
  ) { }

  ngOnInit(): void {
    this.workspaceService.init();
    this.workspace$ = this.workspaceService.getCurrentWorkspace();
    this.boards$ = this.boardsService.getBoards();
  }

}
