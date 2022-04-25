import { GotoService } from './../../core/services/goto.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserStore } from 'src/app/state/user/user.store';
import { WorkspaceStore } from 'src/app/state/workspaces/workspaces.store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  constructor(
    private goto: GotoService,
    private userStore: UserStore,
    private workspaceStore: WorkspaceStore,
  ) { }

  ngOnInit(): void {
    const userState = this.userStore.getValue();
    if (!userState.user?.id) {
      this.goto.login();
      return;
    }
    this.workspaceStore.init(userState.user.id);
  }

}
