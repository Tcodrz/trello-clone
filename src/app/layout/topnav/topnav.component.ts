import { Component, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { User } from 'src/app/state/user/user.reducer';
import { Icons } from '../icon/icon.component';
import { ScreenSize } from './../../core/interface/screen-size.enum';
import { StoreService } from './../../state/state.service';
import { UserState } from './../../state/user/user.reducer';
import { MenuItems } from './../menu/menu.component';
import { profileMenuItems } from './topnav-menus';

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
  profileMenuItems: MenuItems[] = profileMenuItems;
  constructor(
    private store: StoreService,
  ) { }
  get smallScreen(): boolean {
    const width = window.innerWidth
    return width <= ScreenSize.Small;
  }
  ngOnInit(): void {
    this.user$ = this.store.select('userState').pipe(
      map(state => (state as UserState).user));
  }

}
