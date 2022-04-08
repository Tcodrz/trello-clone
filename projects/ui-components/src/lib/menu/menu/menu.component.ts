import { Icons } from 'projects/ui-components/src/lib/button/icon/icons';
import { Component, Input, OnInit, ElementRef, HostListener, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Menu, MenuItem, MenuItems, MenuPosition } from '../../../interface/menu.interface';

@Component({
  selector: 'ui-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit, Menu {
  @Input() title: string = '';
  @Input() menus: MenuItems[] | null = [];
  @Input() set position(position: MenuPosition) {
    if (!position) position = 'left';
    this.initPosition(position);
  }
  @Input() disableToggleOnClick: boolean = false;
  @Input() showCloseIcon: boolean = true;
  @Output() itemClick: EventEmitter<MenuItem> = new EventEmitter();
  @Output() toggle: EventEmitter<boolean> = new EventEmitter();
  _show: boolean = false;
  Icons = Icons;
  @HostListener('document:click', ['$event']) onBlur(event: Event) {
    const isOutside = !this.elementRef.nativeElement.parentElement.contains(event.target);
    if (isOutside && this._show) this.onToggle();
  }
  constructor(
    public elementRef: ElementRef,
  ) { }
  ngOnInit(): void { }
  onToggle() {
    this._show = !this._show;
    this.toggle.emit(this._show);
  }
  onClose() {
    this._show = false;
    this.toggle.emit(this._show);
  }
  onItemClick(item: MenuItem) {
    if (!!item.command) item.command();
    if (!this.disableToggleOnClick) this.onToggle();
    this.itemClick.emit(item);
  }
  isOpen() {
    return this._show;
  }
  initPosition(position: string) {
    switch (position) {
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
}
