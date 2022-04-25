import { User } from 'src/app/core/interface/user.interface';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Icons, MenuItems } from '@ui-components';

@Component({
  selector: 'app-members-menu',
  templateUrl: './members-menu.component.html',
  styleUrls: ['./members-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembersMenuComponent implements OnInit {
  @Input() members: User[] | undefined = [];
  Icons = Icons;
  membersMenu: MenuItems[] = [
    {
      headline: '',
      items: []
    }
  ];
  constructor() { }
  ngOnInit(): void { }
}
