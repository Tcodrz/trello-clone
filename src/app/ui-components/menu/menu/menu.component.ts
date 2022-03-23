import { Component, Input, OnInit, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';
import { Icons } from '../../button/icon/icon.component';

export interface MenuItem {
  label: string;
  icon?: Icons;
  command?: (...args: any) => void
}
export interface Menu {
  toggle: () => void;
}
export interface MenuItems {
  headline: string;
  items: MenuItem[];
}
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, Menu {
  @Input() title: string = '';
  @Input() menus: MenuItems[] = [];
  @Input() set position(val: 'left' | 'right') {
    if (!val) val = 'left';
    switch (val) {
      case 'left':
        this.elementRef.nativeElement.style.right = 0;
        break;
      case 'right':
        this.elementRef.nativeElement.style.left = 0;
        break;
    }
  }
  @Output() itemClick: EventEmitter<MenuItem> = new EventEmitter();
  _show: boolean = false;
  @HostListener('document:click', ['$event']) onBlur(event: Event) {
    const isOutside = !this.elementRef.nativeElement.parentElement.contains(event.target);
    if (isOutside && this._show) this.toggle();
  }
  constructor(
    public elementRef: ElementRef,
  ) { }
  ngOnInit(): void {
  }
  toggle() {
    this._show = !this._show;
  }
  onItemClick(item: MenuItem) {
    if (!!item.command) item.command();
    this.itemClick.emit(item);
  }
}
