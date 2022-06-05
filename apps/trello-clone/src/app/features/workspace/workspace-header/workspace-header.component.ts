import { Component, Input, OnInit } from '@angular/core';
import { Workspace } from "@trello-clone/trello-interface";
import { Icons } from "@ui-components";

@Component({
  selector: 'app-workspace-header',
  templateUrl: './workspace-header.component.html',
  styleUrls: ['./workspace-header.component.scss'],
})
export class WorkspaceHeaderComponent {
  @Input() workspace: Workspace | null = null;
  Icons = Icons;
}
