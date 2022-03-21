import { MenuItem } from './../menu/menu.component';
import { Observable, of } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/state/user/user.reducer';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss']
})
export class ProfileMenuComponent implements OnInit {
  @Input() user: Observable<User | null> = of(null);

  constructor() { }
  ngOnInit(): void { }
}
