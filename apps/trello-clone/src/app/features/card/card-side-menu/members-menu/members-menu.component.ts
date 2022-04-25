import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MenuItems } from './../../../../../../../../libs/ui-components/src/interface/menu.interface';
import { Icons } from './../../../../../../../../libs/ui-components/src/lib/button/icon/icons';
import { User } from './../../../../core/interface/user.interface';

@Component({
  selector: 'app-members-menu',
  templateUrl: './members-menu.component.html',
  styleUrls: ['./members-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembersMenuComponent {
  @Input() members: User[] | undefined = [];
  Icons = Icons;
  membersMenu: MenuItems[] = [
    {
      headline: '',
      items: []
    }
  ];
}
