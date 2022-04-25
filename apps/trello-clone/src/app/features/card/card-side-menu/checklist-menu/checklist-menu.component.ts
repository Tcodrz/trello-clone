import { Icons } from './../../../../../../../../libs/ui-components/src/lib/button/icon/icons';
import { MenuItems } from './../../../../../../../../libs/ui-components/src/interface/menu.interface';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-checklist-menu',
  templateUrl: './checklist-menu.component.html',
  styleUrls: ['./checklist-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChecklistMenuComponent {
  @Output() addChecklist: EventEmitter<string> = new EventEmitter<string>();
  checklistMenu: MenuItems[] = [{
    headline: '',
    items: []
  }];
  Icons = Icons;
  onAddChecklist(name: string) {
    this.addChecklist.emit(name);
  }
}
