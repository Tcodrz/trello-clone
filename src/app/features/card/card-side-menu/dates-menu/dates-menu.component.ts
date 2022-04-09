import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Icons, MenuItems } from '@ui-components';

@Component({
  selector: 'app-dates-menu',
  templateUrl: './dates-menu.component.html',
  styleUrls: ['./dates-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatesMenuComponent implements OnInit {
  Icons = Icons;
  datesMenu: MenuItems[] = [
    {
      headline: '',
      items: []
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
