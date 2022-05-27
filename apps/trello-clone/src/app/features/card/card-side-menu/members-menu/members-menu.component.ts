import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Icons, MenuItems} from '@ui-components';
import {User} from '@trello-clone/trello-interface';

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
