import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Icons, MenuItems} from '@ui-components';

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
