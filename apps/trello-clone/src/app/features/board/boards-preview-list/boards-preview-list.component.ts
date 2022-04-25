import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Board } from '../../../core/interface/board.interface';
import { Workspace } from '../../../core/interface/workspace.interface';

@Component({
  selector: 'app-boards-preview-list',
  templateUrl: './boards-preview-list.component.html',
  styleUrls: ['./boards-preview-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardsPreviewListComponent {
  @Input() boards: Board[] | null = [];
  @Input() workspaces: Workspace[] | null = [];
  @Input() workspace: Workspace | null = null;
  @Output() boardClick: EventEmitter<Board> = new EventEmitter();
  @Output() createBoard: EventEmitter<Partial<Board>> = new EventEmitter();
  onBoardClick(board: Board) {
    this.boardClick.emit(board);
  }
  onSubmit(newBoard: Partial<Board>) {
    this.createBoard.emit(newBoard);
  }
}
