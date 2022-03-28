import { WorkspaceService } from './../../core/services/workspace.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  constructor(
    private workspaceService: WorkspaceService,
  ) { }

  ngOnInit(): void {
    this.workspaceService.setCurrentWorkspace(null);
  }

}
