import {Icons, MenuItems} from '@ui-components';
import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {Board} from '@trello-clone/trello-interface';
import {GotoService} from '../../../core/services/goto.service';

@Component({
  selector: 'app-menu-boards',
  templateUrl: './menu-boards.component.html',
  styleUrls: ['./menu-boards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuBoardsComponent implements OnChanges {
  @Input() boards: Board[] | null = [];
  @Output() boardClick: EventEmitter<Board> = new EventEmitter<Board>();
  menuItems: MenuItems | null = null;
  Icons = Icons;
  constructor(
    private goto: GotoService,
  ) { }
  ngOnChanges(): void {
    this.menuItems = this.initMenuItems();
  }
  initMenuItems(): MenuItems | null {
    if (!this.boards) return null;
    const boardItems = this.boards?.map(board => ({
      label: board.name,
      command: () => this.goto.board(board.id, board.workspaceID)
    }));
    return {
      headline: 'Your boards',
      items: boardItems,
    };
  }
  onBoardClick(board: Board) {
    this.boardClick.emit(board);
  }
}
