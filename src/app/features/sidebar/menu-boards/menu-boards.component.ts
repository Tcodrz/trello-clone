import { Component, Input, OnChanges, OnInit, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { MenuItems } from '@ui-components';
import { Board } from '../../../core/interface/board.interface';
import { BoardsService } from '../../../core/services/boards.service';
import { GotoService } from '../../../core/services/goto.service';

@Component({
  selector: 'app-menu-boards',
  templateUrl: './menu-boards.component.html',
  styleUrls: ['./menu-boards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuBoardsComponent implements OnInit, OnChanges {
  @Input() boards: Board[] | null = [];
  menuItems: MenuItems | null = null;
  constructor(
    private boardsService: BoardsService,
    private goto: GotoService,
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.initMenuItems();
  }

  ngOnInit(): void {
  }
  initMenuItems() {
    if (!this.boards) return;
    const boardItems = this.boards?.map(board => ({
      label: board.name,
      command: () => {
        this.boardsService.setCurrentBoard(board);
        this.goto.board();
      }
    }));
    this.menuItems = {
      headline: 'Your boards',
      items: boardItems,
    }
  }

}
