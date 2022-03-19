import { User } from 'src/app/state/user/user.reducer';
import { map, Observable, of } from 'rxjs';
import { UserState } from './../../state/user/user.reducer';
import { Component, OnInit } from '@angular/core';
import { Icons } from '../icon/icon.component';
import { StoreService } from './../../state/state.service';

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
  constructor(
    private store: StoreService,
  ) { }

  ngOnInit(): void {
    this.user$ = this.store.select('userState').pipe(
      map(state => (state as UserState).user));
  }

}
