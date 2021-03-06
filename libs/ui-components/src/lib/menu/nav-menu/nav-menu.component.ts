import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MenuItems } from '../../../interface/menu.interface';

@Component({
  selector: 'ui-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavMenuComponent implements OnInit {
  @Input() title = '';
  @Input() position: 'right' | 'left' = 'left';
  @Input() items: MenuItems[] | null = [];
  constructor() { }
  ngOnInit(): void { }
}
