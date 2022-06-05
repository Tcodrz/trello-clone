import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Board, Workspace } from "@trello-clone/trello-interface";
import { BoardsService } from "../../../core/services/boards.service";
import { Observable, of } from "rxjs";
import { WorkspaceService } from "../../../core/services/workspace.service";

@Component({
  selector: 'app-feed',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardsComponent implements OnInit {
  boards: Observable<Board[]> = of([]);
  workspaces$: Observable<Workspace[]> = of([]);

  constructor(
    private boardsService: BoardsService,
    private workspaceService: WorkspaceService,
  ) { }

  ngOnInit(): void {
    this.workspaces$ = this.workspaceService.getAll();
  }

}
