import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Icons, MenuItems } from '@ui-components';
import { Board } from 'src/app/core/interface/board.interface';

@Component({
  selector: 'app-card-side-menu',
  templateUrl: './card-side-menu.component.html',
  styleUrls: ['./card-side-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardSideMenuComponent implements OnInit {
  @Input() board: Board | null = null;
  Icons = Icons;
  labelsMenu: MenuItems[] = [
    {
      headline: '',
      items: []
    }
  ];
  checklistMenu: MenuItems[] = [
    {
      headline: '',
      items: []
    }
  ];
  datesMenu: MenuItems[] = [
    {
      headline: '',
      items: []
    }
  ];
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
