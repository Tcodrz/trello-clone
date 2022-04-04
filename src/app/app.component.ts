import { WorkspaceStore } from 'src/app/state/workspaces/workspaces.store';
import { WorkspaceService } from './core/services/workspace.service';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { User } from './core/interface/user.interface';
import { CacheKeys, CacheService } from './core/services/cache.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(
    private cacheService: CacheService,
    private userService: UserService,
    private workspaceStore: WorkspaceStore,
  ) { }
  ngOnInit() {
    const user = this.cacheService.getItem<User>(CacheKeys.User);
    if (!!user) {
      this.userService.login(user);
      this.workspaceStore.init(user.id);
    }
  }
}
