import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MenuItem } from '../../../ui-components/menu/menu/menu.component';

@Component({
  selector: 'app-sidebar-links',
  templateUrl: './sidebar-links.component.html',
  styleUrls: ['./sidebar-links.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarLinksComponent implements OnInit {
  @Input() menuItems: MenuItem[] | null = [];
  constructor() { }
  ngOnInit(): void { }
  onItmeClick(item: MenuItem) {
    if (!!item.command) item.command();
  }

}
