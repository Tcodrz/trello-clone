import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Board, Workspace } from "@trello-clone/trello-interface";
import { BoardsService } from "../../../../core/services/boards.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-workspace-preview',
  templateUrl: './workspace-preview.component.html',
  styleUrls: ['./workspace-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkspacePreviewComponent implements OnInit {
  @Input() workspace!: Workspace;
  boards$!: Observable<Board[]>;

  constructor(
    private boardsService: BoardsService
  ) {}

  ngOnInit(): void {
    this.boards$ = this.boardsService.getWorkspaceBoards(this.workspace.id);
  }
}
