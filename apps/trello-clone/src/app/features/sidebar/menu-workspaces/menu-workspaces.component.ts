import {Icons, MenuItem} from '@ui-components';
import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import { Workspace } from '@trello-clone/trello-interface';

@Component({
  selector: 'app-menu-workspaces',
  templateUrl: './menu-workspaces.component.html',
  styleUrls: ['./menu-workspaces.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuWorkspacesComponent implements OnInit {
  @Input() workspaces: Workspace[] | null = [];
  Icons = Icons;
  workspaceMenuItems: MenuItem[] = [];
  ngOnInit(): void {
    this.initWorkspaceMenu();
  }
  initWorkspaceMenu() {
    this.workspaceMenuItems = [
      {
        label: 'Boards',
        icon: Icons.ClipBoard,
      },
      {
        label: 'Highlights',
        icon: Icons.Heart,
      },
      {
        label: 'Views',
        icon: Icons.BorderAll,
      },
      {
        label: 'Members',
        icon: Icons.Users
      },
      {
        label: 'Settings',
        icon: Icons.Settings,
      }
    ];
  }

}
