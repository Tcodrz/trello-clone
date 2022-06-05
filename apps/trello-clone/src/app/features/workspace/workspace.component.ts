import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { combineLatest, Observable, switchMap } from 'rxjs';
import { Board, Workspace } from '@trello-clone/trello-interface';
import { BoardsService } from '../../core/services/boards.service';
import { WorkspaceService } from '../../core/services/workspace.service';
import { Tab } from "@ui-components";

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceComponent implements OnInit {
  view$!: Observable<[Workspace | null, Workspace[], Board[]]>;
  tabs: Tab[] = [
    {
      id: 1,
      title: 'Boards',
      action: () => console.log('Boards')
    },
    {
      id: 2,
      title: 'Workspace table',
      action: () => console.log('Workspace table')
    },
    {
      id: 3,
      title: 'Members',
      action: () => console.log('Members')
    },
    {
      id: 4,
      title: 'Settings',
      action: () => console.log('Settings')
    }
  ];

  constructor(
    private activeRoute: ActivatedRoute,
    private boardsService: BoardsService,
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

  onCreateBoard(board: Partial<Board>) {
    this.boardsService.createNewBoard(board);
  }
}
