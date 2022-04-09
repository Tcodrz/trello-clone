import { Icons, MenuItems } from '@ui-components';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-attachements-menu',
  templateUrl: './attachements-menu.component.html',
  styleUrls: ['./attachements-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttachementsMenuComponent implements OnInit {
  Icons = Icons;
  attachmentsMenu: MenuItems[] = [
    {
      headline: '',
      items: []
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
