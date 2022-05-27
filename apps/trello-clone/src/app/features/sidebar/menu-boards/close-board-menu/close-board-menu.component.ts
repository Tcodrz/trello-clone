import {Icons, MenuComponent} from '@ui-components';
import {ChangeDetectionStrategy, Component, Input, ViewChild} from '@angular/core';
import {Board} from '@trello-clone/trello-interface';

@Component({
  selector: 'app-close-board-menu',
  templateUrl: './close-board-menu.component.html',
  styleUrls: ['./close-board-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CloseBoardMenuComponent {
  @Input() board!: Board;
  @ViewChild('menu') menu!: MenuComponent;
  page = 1;
  Icons = Icons;
  next(i: number) { this.page += i; }
  onHide(): void { this.page = 1; }
}
