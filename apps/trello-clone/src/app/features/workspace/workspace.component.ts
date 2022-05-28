import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {combineLatest, Observable, switchMap} from 'rxjs';
import {Board, Workspace} from '@trello-clone/trello-interface';
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
  view$!: Observable<[Workspace | null, Workspace[], Board[]]>;

  constructor(
    private activeRoute: ActivatedRoute,
    private boardsService: BoardsService,
    private goto: GotoService,
    private workspaceService: WorkspaceService,
  ) {
  }

  ngOnInit(): void {
    this.view$ = this.activeRoute.params
      .pipe(
        switchMap((params: Params) => {
            return combineLatest([
              this.workspaceService.getWorkspace(params['workspaceID']),
              this.workspaceService.getAll(),
              this.boardsService.getBoards(params['workspaceID']),
            ])
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
