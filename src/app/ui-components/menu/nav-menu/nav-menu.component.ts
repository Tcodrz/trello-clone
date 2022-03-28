import { MenuItem, MenuItems } from './../menu/menu.component';
import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavMenuComponent implements OnInit {
  @Input() title: string = '';
  @Input() position: 'right' | 'left' = 'left';
  @Input() items: MenuItems[] | null = [];
  constructor() { }
  ngOnInit(): void { }
}
