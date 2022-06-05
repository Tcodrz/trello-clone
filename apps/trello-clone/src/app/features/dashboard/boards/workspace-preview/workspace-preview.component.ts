import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Board, Workspace } from "@trello-clone/trello-interface";
import { BoardsService } from "../../../../core/services/boards.service";
import { Observable } from "rxjs";
import { LogoPreviewConfig, LogoPreviewSize } from "@ui-components";

@Component({
  selector: 'app-workspace-preview',
  templateUrl: './workspace-preview.component.html',
  styleUrls: ['./workspace-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkspacePreviewComponent implements OnInit, OnChanges {
  @Input() workspace!: Workspace;
  boards$!: Observable<Board[]>;

  workspaceLogoConfig: LogoPreviewConfig = {} as LogoPreviewConfig;

  constructor(
    private boardsService: BoardsService
  ) {}

  ngOnInit(): void {
    this.boards$ = this.boardsService.getWorkspaceBoards(this.workspace.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.workspaceLogoConfig = {
      name: this.workspace.name,
      size: LogoPreviewSize.Medium
    }
  }
}
