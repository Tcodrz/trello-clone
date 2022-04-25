import { Icons } from './../../../../../../../libs/ui-components/src/lib/button/icon/icons';
import { MenuItems } from './../../../../../../../libs/ui-components/src/interface/menu.interface';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Board } from '../../../core/interface/board.interface';
import { GotoService } from '../../../core/services/goto.service';

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
  ngOnChanges(changes: SimpleChanges): void {
    this.menuItems = this.initMenuItems();
  }
  initMenuItems(): MenuItems | null {
    if (!this.boards) return null;
    const boardItems = this.boards?.map(board => ({
      label: board.name,
      command: () => this.goto.board(board.id, board.workspaceID)
    }));
    const menuItems: MenuItems = {
      headline: 'Your boards',
      items: boardItems,
    };
    return menuItems;
  }
  onBoardClick(board: Board) {
    this.boardClick.emit(board);
  }
}
