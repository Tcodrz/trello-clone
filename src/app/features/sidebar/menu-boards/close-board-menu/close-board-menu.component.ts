import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Icons, MenuComponent } from '@ui-components';
import { Board } from 'src/app/core/interface/board.interface';

@Component({
  selector: 'app-close-board-menu',
  templateUrl: './close-board-menu.component.html',
  styleUrls: ['./close-board-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CloseBoardMenuComponent implements OnInit {
  @Input() board!: Board;
  @ViewChild('menu') menu!: MenuComponent;
  page: number = 1;
  Icons = Icons;
  constructor() { }
  ngOnDestroy(): void { }
  ngOnInit(): void { }
  next(i: number) { this.page += i; }
  onHide(): void { this.page = 1; }
}
