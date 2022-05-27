import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '@trello-clone/trello-interface';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileMenuComponent {
  @Input() user: User | null = null;

}
