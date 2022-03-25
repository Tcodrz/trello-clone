import { StateService } from './../../../state/state.service';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Board } from './../../../core/interface/board.interface';
import { GotoService } from './../../../core/services/goto.service';
import { MenuItems } from './../menu/menu.component';

@Component({
  selector: 'app-menu-boards',
  templateUrl: './menu-boards.component.html',
  styleUrls: ['./menu-boards.component.scss']
})
export class MenuBoardsComponent implements OnInit, OnChanges {
  @Input() boards: Board[] | null = [];
  menuItems: MenuItems | null = null;
  constructor(
    private goto: GotoService,
    private state: StateService,
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
        this.state.loadBoard(board);
        this.goto.board();
      }
    }));
    this.menuItems = {
      headline: 'Yor boards',
      items: boardItems,
    }
  }

}
