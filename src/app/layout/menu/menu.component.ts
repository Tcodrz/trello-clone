import { Component, Input, OnInit } from '@angular/core';
import { Icons } from './../icon/icon.component';

export interface MenuItem {
  label: string;
  icon?: Icons;
}
export interface Menu {
  toggle: () => void;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, Menu {
  @Input() title: string = '';
  @Input() items: MenuItem[] = [];
  _show: boolean = false;
  constructor() { }
  ngOnInit(): void {
  }
  toggle() {
    this._show = !this._show;
  }
}
