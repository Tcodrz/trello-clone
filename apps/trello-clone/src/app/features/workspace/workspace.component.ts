import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {combineLatest, Observable, switchMap, tap} from 'rxjs';
import {Board, Workspace} from '@trello-clone/trello-interface';
import {BoardsService} from '../../core/services/boards.service';
import {WorkspaceService} from '../../core/services/workspace.service';
import {Tab} from "@ui-components";
import {GotoService} from "../../core/services/goto.service";
import {WorkspaceTabs} from './workspace.types';


@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceComponent implements OnInit {
  view$!: Observable<[Workspace | null, Workspace[], Board[]]>;
  private workspaceID: string | undefined;
  activeTab: WorkspaceTabs = WorkspaceTabs.Boards;
  WorkspaceTabs = WorkspaceTabs;
  tabs: Tab[] = [
    {
      id: WorkspaceTabs.Boards,
      title: 'Boards',
      action: () => {
        if (this.workspaceID)
          this.goto.workspace(this.workspaceID, WorkspaceTabs.Boards);
      }
    },
    {
      id: WorkspaceTabs.WorkspaceTable,
      title: 'Workspace table',
      action: () => {
        if (this.workspaceID)
          this.goto.workspace(this.workspaceID, WorkspaceTabs.WorkspaceTable);
      }
    },
    {
      id: WorkspaceTabs.Members,
      title: 'Members',
      action: () => {
        if (this.workspaceID)
          this.goto.workspace(this.workspaceID, WorkspaceTabs.Members);
      }
    },
    {
      id: WorkspaceTabs.Settings,
      title: 'Settings',
      action: () => {
        if (this.workspaceID)
          this.goto.workspace(this.workspaceID, WorkspaceTabs.Settings);
      }
    }
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private boardsService: BoardsService,
    private workspaceService: WorkspaceService,
    private goto: GotoService
  ) {
  }

  ngOnInit(): void {
    this.view$ = this.activatedRoute.params
      .pipe(
        tap((params: Params) => {
          this.workspaceID = params['workspaceID'];
          if (params['activeTab'] >= 0) {
            this.activeTab = +params['activeTab'];
          }
        }),
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
