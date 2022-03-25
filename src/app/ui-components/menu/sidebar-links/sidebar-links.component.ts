import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '../menu/menu.component';

@Component({
  selector: 'app-sidebar-links',
  templateUrl: './sidebar-links.component.html',
  styleUrls: ['./sidebar-links.component.scss']
})
export class SidebarLinksComponent implements OnInit {
  @Input() menuItems: MenuItem[] | null = [];
  constructor() { }
  ngOnInit(): void { }
  onItmeClick(item: MenuItem) {
    if (!!item.command) item.command();
  }

}
