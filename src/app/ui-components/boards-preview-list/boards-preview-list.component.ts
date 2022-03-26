import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Board } from 'src/app/core/interface/board.interface';
import { Workspace } from 'src/app/core/interface/workspace.interface';
import { MenuComponent } from './../menu/menu/menu.component';

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
  @ViewChild('newBoardMenu', { static: false }) newBoardMenu!: MenuComponent;
  constructor() { }
  ngOnInit(): void { }
  onBoardClick(board: Board) {
    this.boardClick.emit(board);
  }
  onSubmit(newBoard: Partial<Board>) {
    this.newBoardMenu.toggle();
  }
  toggleIfClosed() {
    if (!this.newBoardMenu.isOpen()) {
      this.newBoardMenu.toggle();
    }
  }
}
