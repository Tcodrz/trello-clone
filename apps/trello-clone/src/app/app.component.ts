import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {User} from '@trello-clone/trello-interface';
import {CacheKeys, CacheService} from './core/services/cache.service';
import {UserService} from './core/services/user.service';
import {WorkspaceStore} from './state/workspaces/workspaces.store';

@Component({
  selector: 'trello-clone-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private cacheService: CacheService,
    private userService: UserService,
    private workspaceStore: WorkspaceStore,
  ) {
  }

  ngOnInit(): void {
    const user = this.cacheService.getItem<User>(CacheKeys.User);
    this.initApp(user);
  }

  initApp(user: User | null) {
    if (user) {
      this.userService.login(user);
      this.workspaceStore.init(user.id);
    }
  }
}
