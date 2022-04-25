import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Icons, MenuItems } from '@ui-components';

@Component({
  selector: 'app-labels-menu',
  templateUrl: './labels-menu.component.html',
  styleUrls: ['./labels-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelsMenuComponent implements OnInit {
  labelsMenu: MenuItems[] = [
    {
      headline: '',
      items: []
    }
  ];
  Icons = Icons;
  constructor() { }

  ngOnInit(): void {
  }

}
