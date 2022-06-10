import {Icons, MenuItems} from '@ui-components';
import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-attachements-menu',
  templateUrl: './attachements-menu.component.html',
  styleUrls: ['./attachements-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttachementsMenuComponent {
  Icons = Icons;
  attachmentsMenu: MenuItems[] = [
    {
      headline: '',
      items: []
    }
  ];
}
