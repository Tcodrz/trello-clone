import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
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
