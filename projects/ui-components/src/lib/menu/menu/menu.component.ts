import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Icons } from 'projects/ui-components/src/lib/button/icon/icons';
import { MenuItem, MenuItems } from '../../../interface/menu.interface';

@Component({
  selector: 'ui-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit {
  @Input() title: string = '';
  @Input() menus: MenuItems[] | null = [];
  @Input() showCloseIcon: boolean = true;
  @Output() itemClick: EventEmitter<MenuItem> = new EventEmitter();
  @Output() hide: EventEmitter<void> = new EventEmitter();
  @ViewChild('menu') menu!: OverlayPanel;
  Icons = Icons;
  menuStyles = {
    width: '300px',
    padding: '8px 8px',
    backgroundColor: '#ffffff',
    borderRadius: '4px',
    boxShadow: '0 0 10px #0000001a',
  }
  constructor(
    public elementRef: ElementRef,
  ) { }
  ngOnInit(): void { }
  onToggle(event: Event) {
    this.menu.toggle(event);
  }
  onClose(event: Event) {
    this.menu.onCloseClick(event);
  }
  onItemClick(item: MenuItem) {
    if (!!item.command) item.command();
    this.itemClick.emit(item);
  }
  onHide() {
    this.hide.emit();
  }
}
