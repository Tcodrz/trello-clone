import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/state/user/user.reducer';
import { ScreenSize } from '../../core/interface/screen-size.enum';
import { StoreService } from '../../state/state.service';
import { UserState } from '../../state/user/user.reducer';
import { Icons } from '../../ui-components/button/icon/icon.component';
import { MenuItem, MenuItems } from '../../ui-components/menu/menu/menu.component';

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
  Icons = Icons;
  user$: Observable<User | null> = of(null);
  profileMenuItems: MenuItems[] = [];
  constructor(
    private store: StoreService,
    private userService: UserService,
    private router: Router,
  ) { }
  get smallScreen(): boolean {
    const width = window.innerWidth
    return width <= ScreenSize.Small;
  }
  ngOnInit(): void {
    this.initProfileMenu();
    this.user$ = this.store.select('userState').pipe(
      map(state => (state as UserState).user));
  }
  onMenuItemClick(item: MenuItem) {
    if (item.command) item.command();
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
              this.router.navigateByUrl('');
            }
          }
        ],
        headline: '',
      }
    ];
  }

}
