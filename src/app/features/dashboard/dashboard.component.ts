import { WorkspaceService } from './../../core/services/workspace.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private workspaceService: WorkspaceService,
  ) { }

  ngOnInit(): void {
    this.workspaceService.setCurrentWorkspace(null);
  }

}
