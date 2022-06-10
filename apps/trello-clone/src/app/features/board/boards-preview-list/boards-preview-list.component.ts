import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { Board, PreviewItem, Workspace } from '@trello-clone/trello-interface';
import { GotoService } from "../../../core/services/goto.service";

@Component({
  selector: 'app-boards-preview-list',
  templateUrl: './boards-preview-list.component.html',
  styleUrls: ['./boards-preview-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardsPreviewListComponent implements OnChanges {
  @Input() boards: Board[] | null = [];
  @Input() workspaces: Workspace[] | null = [];
  @Input() workspace: Workspace | null = null;
  @Output() createBoard: EventEmitter<Partial<Board>> = new EventEmitter();

  constructor(
    private goto: GotoService
  ) {}

  boardPreviewItems: PreviewItem[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['boards']) {
      this.initPreviewItems();
    }
  }

  onSubmit(newBoard: Partial<Board>) {
    this.createBoard.emit(newBoard);
  }

  private initPreviewItems() {
    if (!this.boards) return;
    this.boardPreviewItems = this.boards.map(board => {
      return {
        name: board.name,
        theme: board.theme,
        action: () => {
          this.goto.board(board.id, board.workspaceID)
        }
      }
    });
  }
}
