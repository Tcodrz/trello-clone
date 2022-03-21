import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MenuItem } from '../menu/menu.component';
import { IconComponent, Icons } from './../icon/icon.component';

@Component({
  selector: 'app-sidebar-dropdown',
  templateUrl: './sidebar-dropdown.component.html',
  styleUrls: ['./sidebar-dropdown.component.scss']
})
export class SidebarDropdownComponent implements OnInit {
  @Input() title: string = '';
  @Input() items: MenuItem[] = [];
  @ViewChild('dropdown', { static: true }) dropdown?: ElementRef;
  @ViewChild('icon') iconElement?: TemplateRef<IconComponent>;
  Icons = Icons;
  icon: Icons = Icons.None;
  private ITEM_HEIGHT = 35;
  private _isOpen: boolean = false;
  get isOpen(): boolean { return this._isOpen; }
  constructor() { }
  ngOnInit(): void {
  }
  onToggle() {
    if (!this.dropdown) return;
    const initialHeight = this.ITEM_HEIGHT;
    const height = initialHeight + (this.items.length * this.ITEM_HEIGHT);
    if (!this._isOpen) {
      this.dropdown.nativeElement.style.height = `${height}px`;
      this.iconElement?.elementRef.nativeElement.classList.add('open');
      this._isOpen = true;
    }
    else {
      this.dropdown.nativeElement.style.height = `${initialHeight}px`;
      this.iconElement?.elementRef.nativeElement.classList.remove('open');
      this._isOpen = false;
    }
  }
}
