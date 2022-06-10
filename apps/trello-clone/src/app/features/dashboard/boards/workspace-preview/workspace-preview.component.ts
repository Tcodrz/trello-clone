import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Board, PreviewItem, Workspace } from "@trello-clone/trello-interface";
import { BoardsService } from "../../../../core/services/boards.service";
import { map, Observable, of } from "rxjs";
import { LogoPreviewConfig, LogoPreviewSize } from "@ui-components";
import { GotoService } from "../../../../core/services/goto.service";
import { WorkspaceService } from "../../../../core/services/workspace.service";

@Component({
  selector: 'app-workspace-preview',
  templateUrl: './workspace-preview.component.html',
  styleUrls: ['./workspace-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkspacePreviewComponent implements OnInit, OnChanges {
  @Input() workspace!: Workspace;
  boards$!: Observable<Board[]>;
  workspaces$: Observable<Workspace[]> = of([]);
  boardsPreviewItems$: Observable<PreviewItem[]> = of([]);
  workspaceLogoConfig: LogoPreviewConfig = {} as LogoPreviewConfig;


  constructor(
    private boardsService: BoardsService,
    private workspaceService: WorkspaceService,
    private goto: GotoService,
  ) {}

  ngOnInit(): void {
    this.workspaces$ = this.workspaceService.getAll();
    this.boards$ = this.boardsService.getWorkspaceBoards(this.workspace.id)
    this.boardsPreviewItems$ = this.boards$.pipe(
      map(boards => boards.map(board => ({
          name: board.name,
          theme: board.theme,
          action: () => {
            this.goto.board(board.id, board.workspaceID);
          }
        }))
      ));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.workspaceLogoConfig = {
      name: this.workspace.name,
      size: LogoPreviewSize.Medium
    }
  }

  createNewBoard(board: Partial<Board>) {
    console.log(board);
  }
}
