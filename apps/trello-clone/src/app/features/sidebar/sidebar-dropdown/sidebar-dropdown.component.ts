import {ChangeDetectionStrategy, Component, ElementRef, Input, TemplateRef, ViewChild} from '@angular/core';
import {IconComponent, Icons, MenuItem} from '@ui-components';

@Component({
  selector: 'app-sidebar-dropdown',
  templateUrl: './sidebar-dropdown.component.html',
  styleUrls: ['./sidebar-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarDropdownComponent {
  @Input() title = '';
  @Input() items: MenuItem[] = [];
  @ViewChild('dropdown', { static: true }) dropdown?: ElementRef;
  @ViewChild('icon') iconElement?: TemplateRef<IconComponent>;
  Icons = Icons;
  icon: Icons = Icons.None;
  private ITEM_HEIGHT = 35;
  private _isOpen = false;
  get isOpen(): boolean { return this._isOpen; }
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
