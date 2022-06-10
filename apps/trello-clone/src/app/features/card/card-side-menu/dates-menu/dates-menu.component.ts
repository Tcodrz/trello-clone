import {Icons, MenuItems} from '@ui-components';
import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-dates-menu',
  templateUrl: './dates-menu.component.html',
  styleUrls: ['./dates-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatesMenuComponent {
  Icons = Icons;
  datesMenu: MenuItems[] = [
    {
      headline: '',
      items: []
    }
  ];
}
