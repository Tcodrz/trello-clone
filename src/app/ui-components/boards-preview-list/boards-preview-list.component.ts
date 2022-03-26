import { Workspace } from 'src/app/core/interface/workspace.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Board } from 'src/app/core/interface/board.interface';

@Component({
  selector: 'app-boards-preview-list',
  templateUrl: './boards-preview-list.component.html',
  styleUrls: ['./boards-preview-list.component.scss']
})
export class BoardsPreviewListComponent implements OnInit {
  @Input() boards: Board[] | null = [];
  @Input() workspaces: Workspace[] | null = [];
  @Input() workspace: Workspace | null = null;
  @Output() boardClick: EventEmitter<Board> = new EventEmitter();
  constructor() { }
  ngOnInit(): void { }
  onBoardClick(board: Board) {
    this.boardClick.emit(board);
  }

}
