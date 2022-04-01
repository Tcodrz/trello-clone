import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Board } from 'src/app/core/interface/board.interface';
import { Workspace } from 'src/app/core/interface/workspace.interface';
import { BoardsService } from './../../core/services/boards.service';
import { GotoService } from './../../core/services/goto.service';
import { WorkspaceService } from './../../core/services/workspace.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceComponent implements OnInit {
  view$!: Observable<{ currentWorkspace: Workspace | null, workspaces: Workspace[], boards: Board[] }>;
  constructor(
    private boardsService: BoardsService,
    private workspaceService: WorkspaceService,
    private goto: GotoService,
  ) { }

  ngOnInit(): void {
    this.workspaceService.init();
    this.view$ = combineLatest({
      currentWorkspace: this.workspaceService.getCurrentWorkspace(),
      workspaces: this.workspaceService.loadAll(),
      boards: this.boardsService.getBoards(),
    });
  }
  onBoardClick(board: Board) {
    this.boardsService.setCurrentBoard(board);
    this.goto.board();
  }
  onCreateBoard(board: Partial<Board>) {
    this.boardsService.createNewBoard(board);
  }
}
