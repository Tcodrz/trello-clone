import { Component, Input, OnInit, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';
import { Icons } from '../../button/icon/icons';

export interface MenuItem {
  label: string;
  icon?: Icons;
  command?: (...args: any) => void;
  route?: string;
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
  @Input() menus: MenuItems[] | null = [];
  @Input() set position(val: 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'mid-right' | 'mid-left') {
    if (!val) val = 'left';
    switch (val) {
      case 'left':
        this.elementRef.nativeElement.style.right = 0;
        break;
      case 'right':
        this.elementRef.nativeElement.style.left = 0;
        break;
      case 'top-left':
        this.elementRef.nativeElement.style.top = 0;
        this.elementRef.nativeElement.style.right = 0;
        break;
      case 'top-right':
        this.elementRef.nativeElement.style.top = 0;
        this.elementRef.nativeElement.style.left = 0;
        break;
      case 'bottom-right':
        this.elementRef.nativeElement.style.bottom = 0;
        this.elementRef.nativeElement.style.left = 0;
        break;
      case 'bottom-left':
        this.elementRef.nativeElement.style.bottom = 0;
        this.elementRef.nativeElement.style.right = 0;
        break;
      case 'mid-right':
        this.elementRef.nativeElement.style.top = '50%';
        this.elementRef.nativeElement.style.left = 0;
        break;
      case 'mid-left':
        this.elementRef.nativeElement.style.top = '50%';
        this.elementRef.nativeElement.style.right = 0;
        break;

    }
  }
  @Input() disableToggleOnClick: boolean = false;
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
    if (!this.disableToggleOnClick) this.toggle();
    this.itemClick.emit(item);
  }
  isOpen() {
    return this._show;
  }
}
