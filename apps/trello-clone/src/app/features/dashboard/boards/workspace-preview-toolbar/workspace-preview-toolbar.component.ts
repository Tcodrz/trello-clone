import { Component, Input } from '@angular/core';
import { Icons, ToolbarItem } from "@ui-components";
import { GotoService } from "../../../../core/services/goto.service";
import { Workspace } from "@trello-clone/trello-interface";

@Component({
  selector: 'app-workspace-preview-toolbar',
  templateUrl: './workspace-preview-toolbar.component.html',
  styleUrls: ['./workspace-preview-toolbar.component.scss'],
})
export class WorkspacePreviewToolbarComponent {

  @Input() workspace: Workspace = {} as Workspace;

  toolbarItems: ToolbarItem[] = [
    {
      title: 'Boards',
      icon: Icons.Trello,
      action: () => {
        this.goto.workspace(this.workspace.id);
      }
    },
    {
      title: 'Views',
      icon: Icons.BorderAll,
    },
    {
      title: 'Members',
      icon: Icons.User,
    },
    {
      title: 'Settings',
      icon: Icons.Settings,
    }
  ];

  constructor(
    private goto: GotoService
  ) {}
}
