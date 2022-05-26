import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {combineLatest, Observable, switchMap} from 'rxjs';
import {Board} from '../../core/interface/board.interface';
import {Workspace} from '../../core/interface/workspace.interface';
import {BoardsService} from '../../core/services/boards.service';
import {GotoService} from '../../core/services/goto.service';
import {WorkspaceService} from '../../core/services/workspace.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceComponent implements OnInit {
  view$!: Observable<{ currentWorkspace: Workspace | null, workspaces: Workspace[], boards: Board[] }>;

  constructor(
    private activeRoute: ActivatedRoute,
    private boardsService: BoardsService,
    private goto: GotoService,
    private workspaceService: WorkspaceService,
  ) { }

  ngOnInit(): void {
    this.view$ = this.activeRoute.params
      .pipe(
        switchMap((params: Params) => {
            return combineLatest({
              currentWorkspace: this.workspaceService.getWorkspace(params['workspaceID']),
              workspaces: this.workspaceService.getAll(),
              boards: this.boardsService.getBoards(params['workspaceID']),
            })
          }
        )
      );
  }

  onBoardClick(board: Board) {
    this.goto.board(board.id, board.workspaceID);
  }

  onCreateBoard(board: Partial<Board>) {
    this.boardsService.createNewBoard(board);
  }
}
