import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/core/interface/user.interface';
import { UserService } from 'src/app/core/services/user.service';
import { ScreenSize } from '../../core/interface/screen-size.enum';
import { Icons } from '../../ui-components/button/icon/icons';
import { MenuItem } from '../../ui-components/menu/menu/menu.component';
import { GotoService } from './../../core/services/goto.service';
import { WorkspaceService } from './../../core/services/workspace.service';
import { MenuItems } from './../../ui-components/menu/menu/menu.component';

export interface Link {
  route: string;
  label: string;
}

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
  user$: Observable<User | null> = of(null);
  workspaceMenu$: Observable<MenuItems[]> = of([]);
  profileMenuItems: MenuItems[] = [];
  Icons = Icons;
  constructor(
    private goto: GotoService,
    private userService: UserService,
    private workspaceService: WorkspaceService,
  ) { }
  get smallScreen(): boolean {
    const width = window.innerWidth
    return width <= ScreenSize.Small;
  }
  ngOnInit(): void {
    this.initProfileMenu();
    this.workspaceMenu$ = this.workspaceService.getMenuItems();
    this.user$ = this.userService.getUser();
  }
  onMenuItemClick(item: MenuItem) {
    if (item.command) item.command();
  }
  gotoDashboard() {
    this.workspaceService.setCurrentWorkspace(null);
    this.goto.dashboard();
  }
  private initProfileMenu() {
    this.profileMenuItems = [
      {
        items: [
          { label: 'Profile and visibility' },
          { label: 'Activity' },
          { label: 'Cards' },
          { label: 'Settings' },
        ],
        headline: ''
      },
      {
        items: [
          {
            label: 'Logout', command: () => {
              this.userService.logout();
              this.goto.home();
            }
          }
        ],
        headline: '',
      }
    ];
  }

}
