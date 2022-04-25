import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Icons, MenuItems } from '@ui-components';

@Component({
  selector: 'app-checklist-menu',
  templateUrl: './checklist-menu.component.html',
  styleUrls: ['./checklist-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChecklistMenuComponent implements OnInit {
  @Output() addChecklist: EventEmitter<string> = new EventEmitter<string>();
  checklistMenu: MenuItems[] = [{
    headline: '',
    items: []
  }];
  Icons = Icons;
  constructor() { }
  ngOnInit(): void { }
  onAddChecklist(name: string) {
    this.addChecklist.emit(name);
  }
}
