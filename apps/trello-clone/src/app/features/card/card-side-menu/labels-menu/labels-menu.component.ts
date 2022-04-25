import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuItems } from './../../../../../../../../libs/ui-components/src/interface/menu.interface';
import { Icons } from './../../../../../../../../libs/ui-components/src/lib/button/icon/icons';

@Component({
  selector: 'app-labels-menu',
  templateUrl: './labels-menu.component.html',
  styleUrls: ['./labels-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelsMenuComponent {
  labelsMenu: MenuItems[] = [
    {
      headline: '',
      items: []
    }
  ];
  Icons = Icons;

}
