import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Icons, MenuItems } from '@ui-components';

@Component({
  selector: 'app-checklist-menu',
  templateUrl: './checklist-menu.component.html',
  styleUrls: ['./checklist-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChecklistMenuComponent implements OnInit {
  Icons = Icons;

  checklistMenu: MenuItems[] = [
    {
      headline: '',
      items: []
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
