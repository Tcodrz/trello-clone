import { MenuItem } from './../menu/menu.component';
import { Workspace } from 'src/app/core/interface/workspace.interface';
import { Icons } from './../../button/icon/icons';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-workspaces',
  templateUrl: './menu-workspaces.component.html',
  styleUrls: ['./menu-workspaces.component.scss']
})
export class MenuWorkspacesComponent implements OnInit {
  @Input() workspaces: Workspace[] | null = [];
  Icons = Icons;
  workspaceMenuItems: MenuItem[] = [];
  constructor() { }

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
